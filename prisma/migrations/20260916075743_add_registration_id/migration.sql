/*
  Warnings:

  - A unique constraint covering the columns `[registrationId]` on the table `PendingSummerCampRegistration` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[registrationId]` on the table `SummerCampRegistration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `registrationId` to the `PendingSummerCampRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationId` to the `SummerCampRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PendingSummerCampRegistration" ADD COLUMN     "registrationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SummerCampRegistration" ADD COLUMN     "registrationId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PendingSummerCampRegistration_registrationId_key" ON "PendingSummerCampRegistration"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "SummerCampRegistration_registrationId_key" ON "SummerCampRegistration"("registrationId");
