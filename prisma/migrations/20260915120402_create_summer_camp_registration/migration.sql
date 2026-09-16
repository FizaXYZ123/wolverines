-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- CreateTable
CREATE TABLE "PendingSummerCampRegistration" (
    "id" TEXT NOT NULL,
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
    "subtotal" DECIMAL(65,30) NOT NULL,
    "siblingDiscount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "processingFee" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "stripePaymentIntentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PendingSummerCampRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SummerCampRegistration" (
    "id" TEXT NOT NULL,
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
    "subtotal" DECIMAL(65,30) NOT NULL,
    "siblingDiscount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "processingFee" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PAID',
    "stripePaymentIntentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SummerCampRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PendingSummerCampRegistration_stripePaymentIntentId_key" ON "PendingSummerCampRegistration"("stripePaymentIntentId");

-- CreateIndex
CREATE UNIQUE INDEX "SummerCampRegistration_stripePaymentIntentId_key" ON "SummerCampRegistration"("stripePaymentIntentId");
