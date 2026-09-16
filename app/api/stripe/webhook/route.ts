import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/app/lib/stripe";
import { prisma } from "@/app/lib/prisma";

import {
  sendSummerCampParentConfirmation,
  sendSummerCampRegistrationNotification,
} from "@/app/lib/email";

export async function POST(request: NextRequest) {
  try {
    // Stripe webhook body must be read as raw text
    const body = await request.text();

    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing Stripe signature",
        },
        { status: 400 },
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      return NextResponse.json(
        {
          success: false,
          message: "Stripe webhook secret is not configured",
        },
        { status: 500 },
      );
    }

    let event: Stripe.Event;

    // Verify Stripe signature
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret,
      );
    } catch (error) {
      console.error("Webhook signature verification failed:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Invalid webhook signature",
        },
        { status: 400 },
      );
    }

    // Handle successful Stripe Checkout payment
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const pendingRegistrationId =
        session.metadata?.pendingRegistrationId;

      if (!pendingRegistrationId) {
        return NextResponse.json(
          {
            success: false,
            message: "Pending registration ID not found",
          },
          { status: 400 },
        );
      }

      // Find pending registration
      const pendingRegistration =
        await prisma.pendingSummerCampRegistration.findUnique({
          where: {
            id: pendingRegistrationId,
          },
        });

      // Already processed
      if (!pendingRegistration) {
        return NextResponse.json(
          {
            success: true,
            message: "Pending registration already processed",
          },
          { status: 200 },
        );
      }

      // Create permanent registration and remove pending one
      const summerRegistration = await prisma.$transaction(
        async (tx) => {
          const registration =
            await tx.summerCampRegistration.create({
              data: {
                parentGuardianName:
                  pendingRegistration.parentGuardianName,

                relationToChild:
                  pendingRegistration.relationToChild,

                email: pendingRegistration.email,

                countryCode:
                  pendingRegistration.countryCode,

                contactNumber:
                  pendingRegistration.contactNumber,

                secondaryCountryCode:
                  pendingRegistration.secondaryCountryCode,

                secondaryContactNumber:
                  pendingRegistration.secondaryContactNumber,

                address:
                  pendingRegistration.address,

                city:
                  pendingRegistration.city,

                postalCode:
                  pendingRegistration.postalCode,

                country:
                  pendingRegistration.country,

                message:
                  pendingRegistration.message,

                children: pendingRegistration.children as any,

                subtotal:
                  pendingRegistration.subtotal,

                siblingDiscount:
                  pendingRegistration.siblingDiscount,

                processingFee:
                  pendingRegistration.processingFee,

                totalAmount:
                  pendingRegistration.totalAmount,

                paymentStatus: "PAID",

                stripeCheckoutSessionId:
                  session.id,
              },
            });

          await tx.pendingSummerCampRegistration.delete({
            where: {
              id: pendingRegistration.id,
            },
          });

          return registration;
        },
      );

      console.log(
        "Summer camp registration created:",
        summerRegistration.id,
      );

      // Send emails
      try {
        await sendSummerCampRegistrationNotification(
          summerRegistration,
        );

        await sendSummerCampParentConfirmation(
          summerRegistration,
        );

        console.log(
          "Summer camp emails sent successfully",
        );
      } catch (emailError) {
        // Email failure should not undo successful payment/registration
        console.error(
          "Summer camp email failed:",
          emailError,
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        received: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Stripe webhook error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Webhook processing failed",
      },
      { status: 500 },
    );
  }
}