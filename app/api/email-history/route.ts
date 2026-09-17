import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, AuthError } from "@/app/lib/auth";

// find all
export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    const history = await prisma.emailHistory.findMany({
      orderBy: {
        sentAt: "desc",
      },
    });

    if (!history) {
      return NextResponse.json(
        {
          message: "email histories not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Email histories fetched successfully",
        data: history,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error("Error fetching email histories", error);

    return NextResponse.json(
      {
        message: "Failed to fetch email histories",
      },
      { status: 500 },
    );
  }
}
