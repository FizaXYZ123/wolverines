import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { requireAdmin, AuthError } from "@/app/lib/auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// get contact inquiry by id
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
    const inquiry = await prisma.contactUs.findUnique({
      where: {
        id,
      },
    });
    if (!inquiry) {
      return NextResponse.json(
        {
          message: "Contact inquiry not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Contact inquiry fetched successfully",
        data: inquiry,
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
    console.error("Get contact inquiry error:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch contact inquiry",
      },
      { status: 500 },
    );
  }
}

// update contact inquiry by id
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin(request);

    const { id } = await context.params;
    if (!id) {
      return NextResponse.json(
        {
          message: "id is required to update contact inquiry",
        },
        { status: 400 },
      );
    }

    const data = await request.json();
    const { fullName, contactNumber, email, message } = data;

    const existInquiry = await prisma.contactUs.findUnique({
      where: {
        id,
      },
    });

    if (!existInquiry) {
      return NextResponse.json(
        {
          message: "Contact inquiry not found",
        },
        { status: 404 },
      );
    }

    const updatedInquiry = await prisma.contactUs.update({
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
        message: "Contact inquiry updated successfully",
        data: updatedInquiry,
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

    console.error("Update contact inquiry error:", error);
    return NextResponse.json(
      {
        message: "Failed to update contact inquiry",
      },
      { status: 500 },
    );
  }
}

// delete contact inquiry by id
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin(request);

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          message: "id is required to delete contact inquiry",
        },
        { status: 400 },
      );
    }

    const existInquiry = await prisma.contactUs.findUnique({
      where: {
        id,
      },
    });

    if (!existInquiry) {
      return NextResponse.json(
        {
          message: "Contact inquiry not found",
        },
        { status: 404 },
      );
    }

    const deletedInquiry = await prisma.contactUs.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        message: "Contact inquiry deleted successfully",
        data: deletedInquiry,
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

    console.error("Delete contact inquiry error:", error);
    return NextResponse.json(
      {
        message: "Failed to delete contact inquiry",
      },
      { status: 500 },
    );
  }
}
