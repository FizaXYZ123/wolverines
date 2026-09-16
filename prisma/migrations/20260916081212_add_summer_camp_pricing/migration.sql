-- CreateTable
CREATE TABLE "SummerCampPricing" (
    "id" TEXT NOT NULL,
    "minAge" INTEGER NOT NULL,
    "maxAge" INTEGER NOT NULL,
    "youngerAgePrice" DECIMAL(65,30) NOT NULL,
    "olderAgePrice" DECIMAL(65,30) NOT NULL,
    "siblingDiscount" DECIMAL(65,30) NOT NULL DEFAULT 40,
    "processingFeePercent" DECIMAL(65,30) NOT NULL DEFAULT 3,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SummerCampPricing_pkey" PRIMARY KEY ("id")
);
