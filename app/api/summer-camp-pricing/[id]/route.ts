import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { requireAdmin, AuthError } from "@/app/lib/auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// update
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin(request);

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "id is required to update summer camp pricing",
        },
        { status: 400 },
      );
    }

    const existingPricing = await prisma.summerCampPricing.findUnique({
      where: {
        id,
      },
    });

    if (!existingPricing) {
      return NextResponse.json(
        {
          success: false,
          message: "Summer camp pricing not found",
        },
        { status: 404 },
      );
    }

    const body = await request.json();

    const {
      minAge,
      maxAge,
      youngerAgePrice,
      olderAgePrice,
      siblingDiscount,
      processingFeePercent,
      isEnabled,
    } = body;

    // Validate only the fields that were provided
    if (minAge !== undefined && (typeof minAge !== "number" || minAge < 0)) {
      return NextResponse.json(
        {
          message: "minAge must be a valid non-negative number",
        },
        { status: 400 },
      );
    }

    if (maxAge !== undefined && (typeof maxAge !== "number" || maxAge < 0)) {
      return NextResponse.json(
        {
          message: "maxAge must be a valid non-negative number",
        },
        { status: 400 },
      );
    }

    const finalMinAge =
      minAge !== undefined ? Number(minAge) : existingPricing.minAge;

    const finalMaxAge =
      maxAge !== undefined ? Number(maxAge) : existingPricing.maxAge;

    if (finalMinAge > finalMaxAge) {
      return NextResponse.json(
        {
          message: "minAge cannot be greater than maxAge",
        },
        { status: 400 },
      );
    }

    if (youngerAgePrice !== undefined && Number(youngerAgePrice) < 0) {
      return NextResponse.json(
        {
          message: "youngerAgePrice cannot be negative",
        },
        { status: 400 },
      );
    }

    if (olderAgePrice !== undefined && Number(olderAgePrice) < 0) {
      return NextResponse.json(
        {
          message: "olderAgePrice cannot be negative",
        },
        { status: 400 },
      );
    }

    if (siblingDiscount !== undefined && Number(siblingDiscount) < 0) {
      return NextResponse.json(
        {
          message: "siblingDiscount cannot be negative",
        },
        { status: 400 },
      );
    }

    if (
      processingFeePercent !== undefined &&
      (Number(processingFeePercent) < 0 || Number(processingFeePercent) > 100)
    ) {
      return NextResponse.json(
        {
          message: "processingFeePercent must be between 0 and 100",
        },
        { status: 400 },
      );
    }

    if (isEnabled !== undefined && typeof isEnabled !== "boolean") {
      return NextResponse.json(
        {
          message: "isEnabled must be a boolean",
        },
        { status: 400 },
      );
    }

    const updatedPricing = await prisma.summerCampPricing.update({
      where: {
        id,
      },
      data: {
        ...(minAge !== undefined && {
          minAge: Number(minAge),
        }),

        ...(maxAge !== undefined && {
          maxAge: Number(maxAge),
        }),

        ...(youngerAgePrice !== undefined && {
          youngerAgePrice: Number(youngerAgePrice),
        }),

        ...(olderAgePrice !== undefined && {
          olderAgePrice: Number(olderAgePrice),
        }),

        ...(siblingDiscount !== undefined && {
          siblingDiscount: Number(siblingDiscount),
        }),

        ...(processingFeePercent !== undefined && {
          processingFeePercent: Number(processingFeePercent),
        }),

        ...(isEnabled !== undefined && {
          isEnabled,
        }),
      },
    });

    return NextResponse.json(
      {
        message: "Summer camp pricing updated successfully",
        data: updatedPricing,
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

    console.error("Error updating summer camp pricing:", error);

    return NextResponse.json(
      {
        message: "Failed to update summer camp pricing",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin(request);

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          message: "id is required to delete summer camp pricing",
        },
        { status: 400 },
      );
    }

    const existingPricing = await prisma.summerCampPricing.findUnique({
      where: {
        id,
      },
    });

    if (!existingPricing) {
      return NextResponse.json(
        {
          message: "summer camp pricing not found",
        },
        { status: 404 },
      );
    }

    const deleted = await prisma.summerCampPricing.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        message: "Summer camp pricing deleted successfully",
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
    console.error("Error deleting summer camp pricing:", error);

    return NextResponse.json(
      {
        message: "Failed to delete summer camp pricing",
      },
      { status: 500 },
    );
  }
}
