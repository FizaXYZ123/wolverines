import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { promises } from "dns";
import { requireAdmin ,AuthError} from "@/app/lib/auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// get registration by id

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin(request);

    const { id } = await context.params;
    if (!id) {
      return NextResponse.json(
        {
          message: "id is required",
        },
        { status: 400 },
      );
    }
    const registration = await prisma.registration.findUnique({
      where: {
        id,
      },
    });
    if (!registration) {
      return NextResponse.json(
        {
          message: "registration not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "registration fetched successfully",
        data: registration,
      },
      { status: 200 },
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
    console.log("get registeration error :", error);
    return NextResponse.json(
      {
        message: "failed to fetch registration",
      },
      { status: 500 },
    );
  }
}

// update registration by id

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin(request);

    const { id } = await context.params;
    if (!id) {
      return NextResponse.json(
        {
          message: " id is required to update registration",
        },
        { status: 400 },
      );
    }

    const data = await request.json();

    const { fullName, contactNumber, email, message } = data;

    const existRegistration = await prisma.registration.findUnique({
      where: {
        id,
      },
    });

    if (!existRegistration) {
      return NextResponse.json(
        {
          message: "registration not found",
        },
        { status: 404 },
      );
    }

    const updatedRegistraion = await prisma.registration.update({
      where: { id },
      data: {
        fullName,
        contactNumber,
        email,
        message: message || null,
      },
    });

    return NextResponse.json(
      {
        message: "registration updated successfully",
        data: updatedRegistraion,
      },
      { status: 200 },
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

    console.log("update registeration error :", error);
    return NextResponse.json(
      {
        message: "failed to update registration",
      },
      { status: 500 },
    );
  }
} 

// delete registration by id

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    
    await requireAdmin(request);

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          message: "id is required to delete registration",
        },
        { status: 400 },
      );
    }

    const existRegistration = await prisma.registration.findUnique({
      where: {
        id,
      },
    });

    if (!existRegistration) {
      return NextResponse.json(
        {
          message: " registration not found",
        },
        { status: 404 },
      );
    }

    const deletedRegistration = await prisma.registration.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        message: " registration deleted successfully",
        data: deletedRegistration,
      },
      { status: 200 },
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

    console.log("delete registeration error :", error);
    return NextResponse.json(
      {
        message: "failed to delete registration",
      },
      { status: 500 },
    );
  }
}
