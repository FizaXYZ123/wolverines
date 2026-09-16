import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { requireAdmin, AuthError } from "../../lib/auth";
import { sendRegistrationNotification } from "../../lib/email";

// get all

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    const registrations = await prisma.registration.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
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

    const { fullName,countryCode, contactNumber, email, message } = data;

    if (!fullName || !email || !contactNumber ||!countryCode) {
      return NextResponse.json(
        {
          message: "name , email , country code and contactNumber is required",
        },
        { status: 400 },
      );
    }

    const registration = await prisma.registration.create({
      data: {
        fullName,
        email,
        countryCode,
        contactNumber,
        message: message || null,
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
