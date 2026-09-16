import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { hashPassword } from "@/app/lib/password";
import { updateUserSchema } from "@/app/validations/user.validation";
import { requireAdmin, AuthError } from "@/app/lib/auth";

// update the user

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// get user by id

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin(request);

    const { id } = await context.params;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "user not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "user fetched successfully",
        data: user,
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

    console.log("error : ", error);
    return NextResponse.json(
      {
        message: "failed to get the user",
      },
      { status: 500 },
    );
  }
}

// update user

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin(request);

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          message: "id is required to update the user",
        },
        { status: 400 },
      );
    }

    const data = await request.json();

    // Validate request
    const result = updateUserSchema.safeParse(data);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    const { name, email, password, role } = result.data;

    // Check duplicate email only if email is changed
    if (email && email !== existingUser.email) {
      const existingEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingEmail) {
        return NextResponse.json(
          {
            success: false,
            message: "Email already exists",
          },
          { status: 409 },
        );
      }
    }

    const updateData: {
      name?: string;
      email?: string;
      password?: string;
      role?: "USER" | "ADMIN";
    } = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (email !== undefined) {
      updateData.email = email;
    }

    if (role !== undefined) {
      updateData.role = role;
    }

    // Hash password if updated
    if (password !== undefined) {
      updateData.password = await hashPassword(password);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "User updated successfully",
        data: updatedUser,
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

    console.log("Update user error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user",
      },
      { status: 500 },
    );
  }
}

// delete user

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin(request);
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          message: "id is required to delete the user",
        },
        { status: 404 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          message: "user not found",
        },
        { status: 404 },
      );
    }

    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "user deleted successfully",
        data: deletedUser,
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

    console.log("error : ", error);
    return NextResponse.json(
      {
        message: "failed to delete the user",
      },
      { status: 500 },
    );
  }
}
