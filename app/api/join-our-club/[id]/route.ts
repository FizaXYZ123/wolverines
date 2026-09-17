import { prisma } from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { AuthError, requireAdmin } from "@/app/lib/auth";

type Routecontext = {
  params: Promise<{
    id: string;
  }>;
};

// find one
export async function GET(request: NextRequest, context: Routecontext) {
  try {
    await requireAdmin(request);

    const { id } = await context.params;
    if (!id) {
      return NextResponse.json(
        {
          message: "id is required to find join Our club",
        },
        { status: 400 },
      );
    }

    const joinOurClub = await prisma.joinOurClub.findUnique({
      where: {
        id,
      },
    });

    if (!joinOurClub) {
      return NextResponse.json(
        { message: "Join Our Club not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({
      message: "Join Our Club details fetched successfully",
      data: joinOurClub,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: error.status },
      );
    }
    console.error("Error fetching Join Our Club:", error);
    return NextResponse.json(
      { message: "Failed to fetch Join Our Club" },
      { status: 500 },
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
          message: "id is required to delete join Our club",
        },
        { status: 400 },
      );
    }

    const existing = await prisma.joinOurClub.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        {
          message: "Join Our Club not found",
        },
        { status: 404 },
      );
    }

    const joinOurClub = await prisma.joinOurClub.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      {
        message: "Join Our Club deleted successfully",
        data: joinOurClub,
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
    console.error("Error deleting Join Our Club:", error);
    return NextResponse.json(
      { message: "Failed to delete Join Our Club" },
      { status: 500 },
    );
  }
}
