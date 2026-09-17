import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireAdmin } from "@/app/lib/auth";

type Routecontext = {
  params: Promise<{ id: string }>;
};

// find by id

export async function GET(request: NextRequest, context: Routecontext) {
  try {
    await requireAdmin(request);

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          message: "Invalid email contact id provided",
        },
        {
          status: 400,
        },
      );
    }

    const emailContact = await prisma.emailContact.findUnique({
      where: {
        id: id,
      },
    });

    if (!emailContact) {
      return NextResponse.json(
        {
          message: "Email contact not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Email contact fetched successfully",
        data: emailContact,
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
        {
          status: error.status,
        },
      );
    }

    console.log("Error in fetching email contact", error);

    return NextResponse.json(
      {
        message: "Failed to fetch email contact",
      },
      {
        status: 500,
      },
    );
  }
}

// delete

export async function DELETE(request: NextRequest, context: Routecontext) {
  try {
    await requireAdmin(request);
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          message: "Invalid email contact id provided",
        },
        {
          status: 400,
        },
      );
    }

    const emailContact = await prisma.emailContact.findUnique({
      where: {
        id: id,
      },
    });

    if (!emailContact) {
      return NextResponse.json(
        {
          message: "Email contact not found",
        },
        {
          status: 404,
        },
      );
    }

    const deleted = await prisma.emailContact.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      {
        message: "email contact deleted successfully",
        data: deleted,
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

    console.log("Error in deleting email contact", error);

    return NextResponse.json(
      {
        message: "Failed to delete email contact",
      },
      {
        status: 500,
      },
    );
  }
}
