import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { requireAdmin, AuthError } from "@/app/lib/auth";
import { campRegistrationSchema } from "@/app/validations/camp-validation";
import { calculateCampFee } from "@/app/lib/camp-fee";
import { stripe } from "@/app/lib/stripe";
import { generateRegistrationId } from "@/app/lib/registration-id";
import { saveEmail } from "@/app/lib/save-email";

// find all

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    const pendingRequests = await prisma.pendingWinterCampRegistration.findMany(
      {
        orderBy: {
          createdAt: "desc",
        },
      },
    );

    if (!pendingRequests) {
      return NextResponse.json(
        { error: "Pending registration not found" },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Pending registrations fetched successfully",
        data: pendingRequests,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    console.error("Error fetching pending registrations", error);

    return NextResponse.json(
      {
        message: "Failed to fetch pending registrations",
      },
      { status: 500 },
    );
  }
}

// create
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate request
    const result = campRegistrationSchema.safeParse(data);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "validation failed",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const {
      parentGuardianName,
      relationToChild,
      email,
      countryCode,
      contactNumber,
      secondaryCountryCode,
      secondaryContactNumber,
      address,
      city,
      postalCode,
      country,
      message,
      children,
    } = result.data;

    // Get current winter camp pricing
    const pricing = await prisma.winterCampPricing.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!pricing) {
      return NextResponse.json(
        {
          message: "Winter camp pricing not found",
        },
        { status: 404 },
      );
    }

    if (!pricing.isEnabled) {
      return NextResponse.json(
        {
          message: "Winter camp registration is currently disabled",
        },
        { status: 403 },
      );
    }

    // Save email if it does not already exist
    const normalizedEmail = email.trim().toLowerCase();

    await saveEmail(normalizedEmail);

    // Calculate fee using admin-configured pricing
    const { subtotal, siblingDiscount, processingFee, totalAmount } =
      calculateCampFee(children, pricing);

    // create pending request
    const pendingRegistration =
      await prisma.pendingWinterCampRegistration.create({
        data: {
          registrationId: generateRegistrationId(),
          parentGuardianName,
          relationToChild,
          email: normalizedEmail,
          countryCode,
          contactNumber,
          secondaryCountryCode: secondaryCountryCode || null,
          secondaryContactNumber: secondaryContactNumber || null,
          address: address || null,
          city: city || null,
          postalCode: postalCode || null,
          country: country || null,
          message: message || null,
          children,
          subtotal,
          siblingDiscount,
          processingFee,
          totalAmount,
          paymentStatus: "PENDING",
        },
      });

    const origin = process.env.LIVE_URL

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      customer_email: normalizedEmail,

      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: "Winter Camp Registration",
            },
            unit_amount: Math.round(totalAmount * 100),
          },
          quantity: 1,
        },
      ],

      success_url: `${origin}/winter-program/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/winter-program/cancel`,

      metadata: {
        pendingRegistrationId: pendingRegistration.id,
        campType: "WINTER",
      },
    });

    await prisma.pendingWinterCampRegistration.update({
      where: {
        id: pendingRegistration.id,
      },
      data: {
        stripeCheckoutSessionId: session.id,
      },
    });

    return NextResponse.json(
      {
        message: "Pending winter camp registration created successfully",
        data: {
          registrationId: pendingRegistration.registrationId,
          subtotal,
          siblingDiscount,
          processingFee,
          totalAmount,
          paymentStatus: "PENDING",
          paymentUrl: session.url,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating pending registration:", error);

    return NextResponse.json(
      { message: "Failed to create pending registration" },
      { status: 500 },
    );
  }
}
