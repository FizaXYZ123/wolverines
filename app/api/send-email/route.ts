import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireAdmin } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { sendDynamicEmail } from "@/app/lib/email";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function extractEmailsFromCsv(csvText: string): string[] {
  return csvText
    .split(/\r?\n/)
    .flatMap((line) => line.split(","))
    .map((value) => value.trim().replace(/^"|"$/g, ""))
    .filter((value) => emailRegex.test(value.toLowerCase()))
    .map((email) => email.toLowerCase());
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);

    const formData = await request.formData();

    const subject = formData.get("subject")?.toString().trim();
    const htmlContent = formData.get("htmlContent")?.toString().trim();

    const email = formData.get("email")?.toString().trim().toLowerCase();

    const sendToAll =
      formData.get("sendToAll")?.toString().toLowerCase() === "true";

    const file = formData.get("file");

    // Validate subject and content
    if (!subject || !htmlContent) {
      return NextResponse.json(
        {
          message: "subject and htmlContent are required",
        },
        { status: 400 },
      );
    }

    // Check how recipients were provided
    const hasDirectEmail = !!email;
    const hasCsvFile = file instanceof File;
    const hasDatabaseRecipients = sendToAll;

    const selectedSources = [
      hasDirectEmail,
      hasCsvFile,
      hasDatabaseRecipients,
    ].filter(Boolean).length;

    if (selectedSources === 0) {
      return NextResponse.json(
        {
          message:
            "Provide an email, CSV file, or set sendToAll to true",
        },
        { status: 400 },
      );
    }

    if (selectedSources > 1) {
      return NextResponse.json(
        {
          message:
            "Use only one recipient source at a time",
        },
        { status: 400 },
      );
    }

    let recipients: string[] = [];
    let source: "DIRECT" | "CSV" | "DATABASE";

    // ---------------------------------
    // 1. Send to one email
    // ---------------------------------
    if (hasDirectEmail) {
      if (!emailRegex.test(email!)) {
        return NextResponse.json(
          {
            message: "Invalid email address",
          },
          { status: 400 },
        );
      }

      recipients = [email!];
      source = "DIRECT";
    }

    // ---------------------------------
    // 2. Send to CSV emails
    // ---------------------------------
    else if (hasCsvFile) {
      if (!file!.name.toLowerCase().endsWith(".csv")) {
        return NextResponse.json(
          {
            message: "Only CSV files are allowed",
          },
          { status: 400 },
        );
      }

      const csvText = await file!.text();

      recipients = extractEmailsFromCsv(csvText);
      source = "CSV";

      if (recipients.length === 0) {
        return NextResponse.json(
          {
            message: "No valid email addresses found in CSV",
          },
          { status: 400 },
        );
      }
    }

    // ---------------------------------
    // 3. Send to all DB contacts
    // ---------------------------------
    else {
      const contacts = await prisma.emailContact.findMany({
        select: {
          email: true,
        },
      });

      recipients = contacts.map((contact) =>
        contact.email.trim().toLowerCase(),
      );

      source = "DATABASE";

      if (recipients.length === 0) {
        return NextResponse.json(
          {
            message: "No email contacts found",
          },
          { status: 404 },
        );
      }
    }

    // Remove duplicates
    recipients = [...new Set(recipients)];

    const totalRecipients = recipients.length;

    let sentCount = 0;
    let failedRecipients: string[] = [];
    let status: "SENT" | "FAILED" | "PARTIAL";

    try {
      const result = await sendDynamicEmail({
        recipients,
        subject,
        htmlContent,
      });

      sentCount = result.sentCount;
      failedRecipients = result.failedRecipients;

      if (failedRecipients.length === 0) {
        status = "SENT";
      } else if (sentCount === 0) {
        status = "FAILED";
      } else {
        status = "PARTIAL";
      }
    } catch (error) {
      console.error("Email sending failed:", error);

      failedRecipients = [...recipients];
      sentCount = 0;
      status = "FAILED";
    }

    const failedCount = failedRecipients.length;

    // Create ONE history record for the whole request
    const history = await prisma.emailHistory.create({
      data: {
        recipients,
        failedRecipients:
          failedRecipients.length > 0
            ? failedRecipients
            : undefined,

        subject,
        htmlContent,

        source,

        status,

        totalRecipients,
        sentCount,
        failedCount,

        errorMessage:
          failedCount > 0
            ? "One or more emails failed to send"
            : null,
      },
    });

    return NextResponse.json(
      {
        message: "Email sending completed",
        data: {
          id: history.id,
          source,
          totalRecipients,
          sentCount,
          failedCount,
          status,
        },
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

    console.error("Error sending emails:", error);

    return NextResponse.json(
      {
        message: "Failed to send emails",
      },
      { status: 500 },
    );
  }
}