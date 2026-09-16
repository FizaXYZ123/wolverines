/*
  Warnings:

  - You are about to drop the column `stripePaymentIntentId` on the `PendingSummerCampRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `stripePaymentIntentId` on the `SummerCampRegistration` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripeCheckoutSessionId]` on the table `PendingSummerCampRegistration` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeCheckoutSessionId]` on the table `SummerCampRegistration` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PendingSummerCampRegistration_stripePaymentIntentId_key";

-- DropIndex
DROP INDEX "SummerCampRegistration_stripePaymentIntentId_key";

-- AlterTable
ALTER TABLE "PendingSummerCampRegistration" DROP COLUMN "stripePaymentIntentId",
ADD COLUMN     "stripeCheckoutSessionId" TEXT;

-- AlterTable
ALTER TABLE "SummerCampRegistration" DROP COLUMN "stripePaymentIntentId",
ADD COLUMN     "stripeCheckoutSessionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "PendingSummerCampRegistration_stripeCheckoutSessionId_key" ON "PendingSummerCampRegistration"("stripeCheckoutSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "SummerCampRegistration_stripeCheckoutSessionId_key" ON "SummerCampRegistration"("stripeCheckoutSessionId");
