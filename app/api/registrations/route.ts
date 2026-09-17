import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { requireAdmin, AuthError } from "../../lib/auth";
import { sendRegistrationNotification } from "../../lib/email";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { saveEmail } from "@/app/lib/save-email";

// get all

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    const registrations = await prisma.registration.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!registrations) {
      return NextResponse.json(
        {
          message: "no registrations found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "registrations fetched successfully",
        data: registrations,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: error.status },
      );
    }

    console.log("resisterartion error :", error);

    return NextResponse.json(
      {
        success: false,
        message: "failed to get registrations",
      },
      {
        status: 500,
      },
    );
  }
}

// create

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { fullName, countryCode, contactNumber, email, message } = data;

    if (!fullName || !email || !contactNumber || !countryCode) {
      return NextResponse.json(
        {
          message: "name , email , country code and contactNumber is required",
        },
        { status: 400 },
      );
    }

    // Validate email
    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        {
          message: "Invalid email address",
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

    // Save email if it does not already exist
    await saveEmail(normalizedEmail);

    const registration = await prisma.registration.create({
      data: {
        fullName: fullName.trim(),
        email: normalizedEmail,
        countryCode: countryCode.trim(),
        contactNumber: contactNumber.trim(),
        message: message?.trim() || null,
      },
    });

    try {
      await sendRegistrationNotification(registration);
    } catch (emailError) {
      console.error("Registration email failed:", emailError);
    }

    return NextResponse.json(
      {
        message: "registration successful",
        data: registration,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("error in registration :", error);

    return NextResponse.json(
      {
        message: "failed to create registration",
      },
      {
        status: 500,
      },
    );
  }
}
