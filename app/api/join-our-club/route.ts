import { parsePhoneNumberFromString } from "libphonenumber-js";
import { requireAdmin, AuthError } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { sendJoinOurClubAdminNotification } from "@/app/lib/email";

// find all

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    const joinOurClub = await prisma.joinOurClub.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!joinOurClub) {
      return NextResponse.json(
        { message: "No join our club found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "join our club details fetched successfully",
      data: joinOurClub,
    },{status:200});
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: error.status },
      );
    }
    console.error("Error fetching join our club:", error);
    return NextResponse.json(
      { message: "Failed to fetch join our club" },
      { status: 500 },
    );
  }
}

// create
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      childName,
      dateOfBirth,
      gender,
      parentGuardianName,
      relationToChild,
      email,
      countryCode,
      contactNumber,
      message,
      secondaryCountryCode,
      secondaryContactNumber,
      secondaryRelationToChild,
      address,
      city,
      postalCode,
      country,
      termsAccepted,
    } = body;

    // Required fields
    if (
      !childName ||
      !dateOfBirth ||
      !gender ||
      !parentGuardianName ||
      !relationToChild ||
      !email ||
      !countryCode ||
      !contactNumber ||
      !message
    ) {
      return NextResponse.json(
        {
          message: "Please fill all required fields.",
        },
        { status: 400 },
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          message: "Invalid email address.",
        },
        { status: 400 },
      );
    }

    // Primary phone validation
    const phoneNumber = parsePhoneNumberFromString(
      `${countryCode}${contactNumber}`,
    );

    if (!phoneNumber || !phoneNumber.isValid()) {
      return NextResponse.json(
        {
          message: "Invalid contact number.",
        },
        { status: 400 },
      );
    }

    // Secondary phone validation only when provided
    if (secondaryContactNumber) {
      if (!secondaryCountryCode) {
        return NextResponse.json(
          {
            message: "Secondary country code is required.",
          },
          { status: 400 },
        );
      }

      const secondaryPhone = parsePhoneNumberFromString(
        `${secondaryCountryCode}${secondaryContactNumber}`,
      );

      if (!secondaryPhone || !secondaryPhone.isValid()) {
        return NextResponse.json(
          {
            message: "Invalid secondary contact number.",
          },
          { status: 400 },
        );
      }
    }

    // Date validation
    const parsedDate = new Date(`${dateOfBirth}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        {
          message: "Invalid date of birth.",
        },
        { status: 400 },
      );
    }

    // Save submission
    const joinOurClub = await prisma.joinOurClub.create({
      data: {
        childName: childName.trim(),
        dateOfBirth: parsedDate,
        gender: gender.trim(),

        parentGuardianName: parentGuardianName.trim(),
        relationToChild: relationToChild.trim(),

        email: email.trim().toLowerCase(),
        countryCode: countryCode.trim(),
        contactNumber: contactNumber.trim(),

        message: message.trim(),

        secondaryCountryCode: secondaryCountryCode?.trim() || null,
        secondaryContactNumber: secondaryContactNumber?.trim() || null,
        secondaryRelationToChild: secondaryRelationToChild?.trim() || null,

        address: address?.trim() || null,
        city: city?.trim() || null,
        postalCode: postalCode?.trim() || null,
        country: country?.trim() || null,
      },
    });

    // Send notification to admin
    try {
      await sendJoinOurClubAdminNotification(joinOurClub);
    } catch (emailError) {
      console.error("Failed to send Join Our Club admin email:", emailError);
    }

    return NextResponse.json(
      {
        message: "Join Our Club request submitted successfully.",
        data: joinOurClub,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Join Our Club error:", error);

    return NextResponse.json(
      {
        message: "Something went wrong while submitting the form.",
      },
      { status: 500 },
    );
  }
}
