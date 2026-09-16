-- AlterTable
ALTER TABLE "SummerCampPricing" ADD COLUMN     "isEnabled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "WinterCampPricing" ADD COLUMN     "isEnabled" BOOLEAN NOT NULL DEFAULT false;
