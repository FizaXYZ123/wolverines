import { prisma } from "@/app/lib/prisma";
import { AuthError, requireAdmin } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// find by id

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          message: "event id is required",
        },
        { status: 400 },
      );
    }

    const event = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      return NextResponse.json(
        {
          message: "event not found",
        },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        event,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching event", error);
    return NextResponse.json(
      {
        message: "Failed to fetch event",
      },
      { status: 500 },
    );
  }
}

// delete
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin(request);

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          message: "event id is required",
        },
        { status: 400 },
      );
    }

    const existing = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        {
          message: "event not found",
        },
        { status: 404 },
      );
    }

    const deletedEvent = await prisma.event.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      {
        message: "event deleted successfully",
        data: deletedEvent
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
    console.error("Error deleting event", error);
    return NextResponse.json(
      {
        message: "Failed to delete event",
      },
      { status: 500 },
    );
  }
}

// update
// UPDATE EVENT
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await requireAdmin(request);

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          message: "id is required to update event",
        },
        { status: 400 },
      );
    }

    const existingEvent = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!existingEvent) {
      return NextResponse.json(
        {
          message: "Event not found",
        },
        { status: 404 },
      );
    }

    const body = await request.json();

    const { date, location, startTime, endTime } = body;

    const updateData: {
      date?: Date;
      location?: string;
      startTime?: Date;
      endTime?: Date;
    } = {};

    // Date
    if (date !== undefined) {
      const parsedDate = new Date(`${date}T00:00:00`);

      if (Number.isNaN(parsedDate.getTime())) {
        return NextResponse.json(
          {
            message: "Invalid date",
          },
          { status: 400 },
        );
      }

      updateData.date = parsedDate;
    }

    // Location
    if (location !== undefined) {
      if (typeof location !== "string" || !location.trim()) {
        return NextResponse.json(
          {
            message: "location must be a non-empty string",
          },
          { status: 400 },
        );
      }

      updateData.location = location.trim();
    }

    // Time
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/;

    if (startTime !== undefined) {
      if (typeof startTime !== "string" || !timeRegex.test(startTime)) {
        return NextResponse.json(
          {
            message: "startTime must be in HH:mm or HH:mm:ss format",
          },
          { status: 400 },
        );
      }

      const normStartTime = startTime.length === 5 ? `${startTime}:00` : startTime;
      updateData.startTime = new Date(`1970-01-01T${normStartTime}Z`);
    }

    if (endTime !== undefined) {
      if (typeof endTime !== "string" || !timeRegex.test(endTime)) {
        return NextResponse.json(
          {
            success: false,
            message: "endTime must be in HH:mm or HH:mm:ss format",
          },
          { status: 400 },
        );
      }

      const normEndTime = endTime.length === 5 ? `${endTime}:00` : endTime;
      updateData.endTime = new Date(`1970-01-01T${normEndTime}Z`);
    }

    // Check final start/end time
    const finalStartTime = updateData.startTime ?? existingEvent.startTime;

    const finalEndTime = updateData.endTime ?? existingEvent.endTime;

    if (finalStartTime >= finalEndTime) {
      return NextResponse.json(
        {
          message: "endTime must be later than startTime",
        },
        { status: 400 },
      );
    }

    const updatedEvent = await prisma.event.update({
      where: {
        id,
      },
      data: updateData,
    });

    return NextResponse.json(
      {
        message: "Event updated successfully",
        data: updatedEvent,
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

    console.error("Error updating event:", error);

    return NextResponse.json(
      {
        message: "Failed to update event",
      },
      { status: 500 },
    );
  }
}
