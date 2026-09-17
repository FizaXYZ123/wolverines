-- CreateEnum
CREATE TYPE "EmailSendStatus" AS ENUM ('SENT', 'FAILED', 'PARTIAL');

-- CreateEnum
CREATE TYPE "EmailRecipientSource" AS ENUM ('DATABASE', 'CSV', 'DIRECT');

-- CreateTable
CREATE TABLE "EmailHistory" (
    "id" TEXT NOT NULL,
    "recipients" JSONB NOT NULL,
    "failedRecipients" JSONB,
    "subject" TEXT NOT NULL,
    "htmlContent" TEXT NOT NULL,
    "source" "EmailRecipientSource" NOT NULL,
    "status" "EmailSendStatus" NOT NULL,
    "totalRecipients" INTEGER NOT NULL,
    "sentCount" INTEGER NOT NULL DEFAULT 0,
    "failedCount" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailHistory_pkey" PRIMARY KEY ("id")
);
