import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { AuthError, requireAdmin } from "@/app/lib/auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// find by id
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin(request);

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          message: "id is required to get pending summer camp",
        },
        { status: 400 },
      );
    }

    const existingRegistration =
      await prisma.pendingSummerCampRegistration.findUnique({
        where: {
          id,
        },
      });

    if (!existingRegistration) {
      return NextResponse.json(
        {
          message: "pending summer camp not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "pending summer camp found successfully",
        data: existingRegistration,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    console.log("get pending summer camp error", error);

    return NextResponse.json(
      {
        message: "failed to get pending summer camp",
      },
      { status: 500 },
    );
  }
}

// delete by id

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin(request);
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          message: "id is required to delete pending summer camp",
        },
        { status: 400 },
      );
    }

    const existRegistration =
      await prisma.pendingSummerCampRegistration.findUnique({
        where: {
          id,
        },
      });

    if (!existRegistration) {
      return NextResponse.json(
        {
          message: "pending summer camp not found",
        },
        { status: 404 },
      );
    }

    const deleted = await prisma.pendingSummerCampRegistration.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        message: "pending summer camp deleted successfully",
        data: deleted,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.log("delete pending summer camp error", error);
    return NextResponse.json(
      {
        message: "failed to delete pending summer camp",
      },
      { status: 500 },
    );
  }
}
