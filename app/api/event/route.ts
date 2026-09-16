import { prisma } from "@/app/lib/prisma";
import { AuthError, requireAdmin } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// find all

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy:{
        createdAt:"desc"
      }
    });

    if (!events) {
      return NextResponse.json(
        {
          message: "events not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "events fetched successfully",
        data: events,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("Error fetching events", error);
    return NextResponse.json(
      {
        message: "Failed to fetch events",
      },
      { status: 500 },
    );
  }
}

// create

export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);

    const data = await request.json();

    const { date, location, startTime, endTime } = data;

    if (!date || !location || !startTime || !endTime) {
      return NextResponse.json(
        {
          message: "date, location, startTime and endTime are required",
        },
        { status: 400 },
      );
    }

    // Validate date
    const parsedDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid date",
        },
        { status: 400 },
      );
    }

    // Validate time format HH:mm:ss
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

    if (typeof startTime !== "string" || !timeRegex.test(startTime)) {
      return NextResponse.json(
        {
          success: false,
          message: "startTime must be in HH:mm:ss format",
        },
        { status: 400 },
      );
    }

    if (typeof endTime !== "string" || !timeRegex.test(endTime)) {
      return NextResponse.json(
        {
          success: false,
          message: "endTime must be in HH:mm:ss format",
        },
        { status: 400 },
      );
    }

    if (startTime >= endTime) {
      return NextResponse.json(
        {
          success: false,
          message: "endTime must be later than startTime",
        },
        { status: 400 },
      );
    }

    const event = await prisma.event.create({
      data: {
        date: parsedDate,
        location: location.trim(),
        startTime: new Date(`1970-01-01T${startTime}Z`),
        endTime: new Date(`1970-01-01T${endTime}Z`),
      },
    });

    return NextResponse.json(
      {
        message: "event created successfully",
        data: event,
      },
      {
        status: 201,
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

    console.error("Error creating event", error);
    return NextResponse.json(
      {
        message: "Failed to create event",
      },
      { status: 500 },
    );
  }
}
