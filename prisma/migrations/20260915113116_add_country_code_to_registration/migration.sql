/*
  Warnings:

  - Added the required column `countryCode` to the `Registration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "countryCode" TEXT NOT NULL;
