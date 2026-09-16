/*
  Warnings:

  - You are about to alter the column `subtotal` on the `PendingSummerCampRegistration` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `siblingDiscount` on the `PendingSummerCampRegistration` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `processingFee` on the `PendingSummerCampRegistration` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `totalAmount` on the `PendingSummerCampRegistration` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `youngerAgePrice` on the `SummerCampPricing` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `olderAgePrice` on the `SummerCampPricing` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `siblingDiscount` on the `SummerCampPricing` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `processingFeePercent` on the `SummerCampPricing` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - You are about to alter the column `subtotal` on the `SummerCampRegistration` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `siblingDiscount` on the `SummerCampRegistration` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `processingFee` on the `SummerCampRegistration` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `totalAmount` on the `SummerCampRegistration` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "PendingSummerCampRegistration" ALTER COLUMN "subtotal" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "siblingDiscount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "processingFee" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "totalAmount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "SummerCampPricing" ALTER COLUMN "youngerAgePrice" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "olderAgePrice" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "siblingDiscount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "processingFeePercent" SET DATA TYPE DECIMAL(5,2);

-- AlterTable
ALTER TABLE "SummerCampRegistration" ALTER COLUMN "subtotal" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "siblingDiscount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "processingFee" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "totalAmount" SET DATA TYPE DECIMAL(10,2);
