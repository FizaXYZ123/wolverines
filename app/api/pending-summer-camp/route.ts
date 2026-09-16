import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { requireAdmin, AuthError } from "@/app/lib/auth";
import { summerCampRegistrationSchema } from "@/app/validations/summer-camp-validation";
import { calculateSummerCampFee } from "@/app/lib/summer-camp-fee";
import { stripe } from "@/app/lib/stripe";

// find all

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    const pendingRequests = await prisma.pendingSummerCampRegistration.findMany(
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

    return NextResponse.json(pendingRequests);
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
    const result = summerCampRegistrationSchema.safeParse(data);

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

    // Calculate fee
    const { subtotal, siblingDiscount, processingFee, totalAmount } =
      calculateSummerCampFee(children);

    // create pending request
    const pendingRegistration =
      await prisma.pendingSummerCampRegistration.create({
        data: {
          parentGuardianName,
          relationToChild,
          email,
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

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      customer_email: email,

      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: "Summer Camp Registration",
            },
            unit_amount: Math.round(totalAmount * 100),
          },
          quantity: 1,
        },
      ],

      success_url:
        "http://localhost:3000/summer-program/success?session_id={CHECKOUT_SESSION_ID}",

      cancel_url: "http://localhost:3000/summer-program/cancel",

      metadata: {
        pendingRegistrationId: pendingRegistration.id,
      },
    });

    await prisma.pendingSummerCampRegistration.update({
      where: {
        id: pendingRegistration.id,
      },
      data: {
        stripeCheckoutSessionId: session.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Pending summer camp registration created successfully",
        data: {
          registrationId: pendingRegistration.id,
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
