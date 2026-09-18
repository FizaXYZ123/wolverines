import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { requireAdmin, AuthError } from "../../lib/auth";
import {
  sendContactUsNotification,
  sendContactUsUserAcknowledgment,
} from "../../lib/email";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { saveEmail } from "@/app/lib/save-email";

// get all contact us inquiries
export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    const inquiries = await prisma.contactUs.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        message: "Contact inquiries fetched successfully",
        data: inquiries,
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

    console.error("Contact inquiries fetch error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to get contact inquiries",
      },
      {
        status: 500,
      },
    );
  }
}

// create contact us inquiry
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { fullName, countryCode, contactNumber, email, message } = data;

    if (!fullName || !email || !contactNumber || !countryCode) {
      return NextResponse.json(
        {
          message: "Full name, email, country code and contact number are required",
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

    const contactInquiry = await prisma.contactUs.create({
      data: {
        fullName: fullName.trim(),
        email: normalizedEmail,
        countryCode: countryCode.trim(),
        contactNumber: contactNumber.trim(),
        message: message?.trim() || null,
      },
    });

    try {
      await sendContactUsNotification(contactInquiry);
      await sendContactUsUserAcknowledgment(contactInquiry);
    } catch (emailError) {
      console.error("Contact inquiry notification email failed:", emailError);
    }

    return NextResponse.json(
      {
        message: "Your message has been sent successfully",
        data: contactInquiry,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating contact inquiry:", error);

    return NextResponse.json(
      {
        message: "Failed to submit contact inquiry",
      },
      {
        status: 500,
      },
    );
  }
}
