import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireAdmin } from "@/app/lib/auth";
import { stripe } from "@/app/lib/stripe";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { saveEmail } from "@/app/lib/save-email";

// find all
export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    const donations = await prisma.pendingDonation.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!donations) {
      return NextResponse.json(
        { message: "Pending donations not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Pending donations fetched successfully",
        data: donations,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error("Error fetching pending donations", error);
    return NextResponse.json(
      { message: "Failed to fetch pending donations" },
      { status: 500 },
    );
  }
}

// create
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const {
      donorName,
      email,
      countryCode,
      contactNumber,
      amount,
      acknowledgement,
    } = data;

    // Required fields
    if (
      !donorName ||
      !email ||
      !countryCode ||
      !contactNumber ||
      amount === undefined ||
      !acknowledgement
    ) {
      return NextResponse.json(
        {
          message:
            "donorName, email, countryCode, contactNumber, amount and acknowledgement are required",
        },
        { status: 400 },
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const normalizedEmail = email.trim().toLowerCase();

    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        {
          message: "Invalid email address",
        },
        { status: 400 },
      );
    }

    await saveEmail(normalizedEmail);

    // Validate amount
    const donationAmount = Number(amount);

    if (!Number.isFinite(donationAmount) || donationAmount < 100) {
      return NextResponse.json(
        {
          message: "Minimum donation amount is 100 CAD",
        },
        { status: 400 },
      );
    }

    // Round to 2 decimal places
    const finalAmount = Number(donationAmount.toFixed(2));

    // Validate acknowledgement
    if (acknowledgement !== "ACKNOWLEDGE" && acknowledgement !== "ANONYMOUS") {
      return NextResponse.json(
        {
          message: "acknowledgement must be ACKNOWLEDGE or ANONYMOUS",
        },
        { status: 400 },
      );
    }

    // Validate country code + phone number
    const phoneNumber = parsePhoneNumberFromString(
      `${countryCode}${contactNumber}`,
    );

    if (!phoneNumber || !phoneNumber.isValid()) {
      return NextResponse.json(
        {
          message: "Invalid phone number for the selected country",
        },
        { status: 400 },
      );
    }

    // Create pending donation
    const pendingDonation = await prisma.pendingDonation.create({
      data: {
        donorName: donorName.trim(),

        email: normalizedEmail,

        countryCode: countryCode.trim(),

        contactNumber: contactNumber.trim(),

        amount: finalAmount,

        currency: "CAD",

        acknowledgement,

        paymentStatus: "PENDING",
      },
    });

    const origin = process.env.LIVE_URL
    let session;

    try {
      // Create Stripe Checkout
      session = await stripe.checkout.sessions.create({
        mode: "payment",

        customer_email: pendingDonation.email,

        line_items: [
          {
            price_data: {
              currency: "cad",

              product_data: {
                name: "Donation - The Wolverines",
              },

              unit_amount: Math.round(finalAmount * 100),
            },

            quantity: 1,
          },
        ],

        success_url: `${origin}/donation/success?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url: `${origin}/donation/cancel`,

        metadata: {
          pendingDonationId: pendingDonation.id,

          type: "DONATION",
        },
      });
    } catch (stripeError) {
      // Remove pending donation if Stripe checkout creation fails
      await prisma.pendingDonation.delete({
        where: {
          id: pendingDonation.id,
        },
      });

      throw stripeError;
    }

    // Save Stripe session ID
    const updatedPendingDonation = await prisma.pendingDonation.update({
      where: {
        id: pendingDonation.id,
      },
      data: {
        stripeCheckoutSessionId: session.id,
      },
    });

    return NextResponse.json(
      {
        message: "Pending donation created successfully",

        data: {
          id: updatedPendingDonation.id,

          amount: finalAmount,

          currency: "CAD",

          acknowledgement,

          paymentStatus: "PENDING",

          paymentUrl: session.url,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating pending donation:", error);

    return NextResponse.json(
      {
        message: "Failed to create pending donation",
      },
      { status: 500 },
    );
  }
}
