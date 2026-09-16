/*
  Warnings:

  - The `paymentStatus` column on the `PendingSummerCampRegistration` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `paymentStatus` column on the `PendingWinterCampRegistration` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `paymentStatus` column on the `SummerCampRegistration` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `winterCampPricing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `winterCampRegistration` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SummerPaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "WinterPaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- AlterTable
ALTER TABLE "PendingSummerCampRegistration" DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" "SummerPaymentStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "PendingWinterCampRegistration" DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" "WinterPaymentStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "SummerCampRegistration" DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" "SummerPaymentStatus" NOT NULL DEFAULT 'PAID';

-- DropTable
DROP TABLE "winterCampPricing";

-- DropTable
DROP TABLE "winterCampRegistration";

-- DropEnum
DROP TYPE "PaymentStatus";

-- CreateTable
CREATE TABLE "WinterCampRegistration" (
    "id" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "parentGuardianName" TEXT NOT NULL,
    "relationToChild" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "secondaryCountryCode" TEXT,
    "secondaryContactNumber" TEXT,
    "address" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "country" TEXT,
    "message" TEXT,
    "children" JSONB NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "siblingDiscount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "processingFee" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "paymentStatus" "WinterPaymentStatus" NOT NULL DEFAULT 'PAID',
    "stripeCheckoutSessionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WinterCampRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WinterCampPricing" (
    "id" TEXT NOT NULL,
    "minAge" INTEGER NOT NULL,
    "maxAge" INTEGER NOT NULL,
    "youngerAgePrice" DECIMAL(10,2) NOT NULL,
    "olderAgePrice" DECIMAL(10,2) NOT NULL,
    "siblingDiscount" DECIMAL(10,2) NOT NULL DEFAULT 40,
    "processingFeePercent" DECIMAL(5,2) NOT NULL DEFAULT 3,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WinterCampPricing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WinterCampRegistration_registrationId_key" ON "WinterCampRegistration"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "WinterCampRegistration_stripeCheckoutSessionId_key" ON "WinterCampRegistration"("stripeCheckoutSessionId");
