import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, AuthError } from "@/app/lib/auth";

type Routercontext = {
  params: Promise<{
    id: string;
  }>;
};

// find one
export async function GET(request: NextRequest, context: Routercontext) {
  try {
    await requireAdmin(request);

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          message: "ID is required to find history",
        },
        { status: 400 },
      );
    }
    const history = await prisma.emailHistory.findUnique({
      where: {
        id,
      },
    });

    if (!history) {
      return NextResponse.json(
        {
          message: "Email history not found",
        },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        message: "Email history fetched successfully",
        data: history,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: error.status},
      );
    }
    console.error("Error fetching email history", error);
    return NextResponse.json(
      {
        message: "Failed to fetch email history",
      },
      { status: 500 },
    );
  }
}

// delete
export async function DELETE(request: NextRequest, context: Routercontext) {
  try {
    await requireAdmin(request);

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          message: "ID is required to delete history",
        },
        { status: 400 },
      );
    }

    const existing = await prisma.emailHistory.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        {
          message: "Email history not found",
        },
        { status: 404 },
      );
    }

    const history = await prisma.emailHistory.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        message: "Email history deleted successfully",
        data: history,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status:error.status},
      );
    }
    console.error("Error deleting email history", error);
    return NextResponse.json(
      {
        message: "Failed to delete email history",
      },
      { status: 500 },
    );
  }
}
