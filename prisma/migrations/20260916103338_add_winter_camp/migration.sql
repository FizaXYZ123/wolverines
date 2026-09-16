-- CreateTable
CREATE TABLE "PendingWinterCampRegistration" (
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
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "stripeCheckoutSessionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PendingWinterCampRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "winterCampRegistration" (
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
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PAID',
    "stripeCheckoutSessionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "winterCampRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "winterCampPricing" (
    "id" TEXT NOT NULL,
    "minAge" INTEGER NOT NULL,
    "maxAge" INTEGER NOT NULL,
    "youngerAgePrice" DECIMAL(10,2) NOT NULL,
    "olderAgePrice" DECIMAL(10,2) NOT NULL,
    "siblingDiscount" DECIMAL(10,2) NOT NULL DEFAULT 40,
    "processingFeePercent" DECIMAL(5,2) NOT NULL DEFAULT 3,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "winterCampPricing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PendingWinterCampRegistration_registrationId_key" ON "PendingWinterCampRegistration"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "PendingWinterCampRegistration_stripeCheckoutSessionId_key" ON "PendingWinterCampRegistration"("stripeCheckoutSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "winterCampRegistration_registrationId_key" ON "winterCampRegistration"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "winterCampRegistration_stripeCheckoutSessionId_key" ON "winterCampRegistration"("stripeCheckoutSessionId");
