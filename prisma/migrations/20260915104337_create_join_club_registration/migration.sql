-- CreateTable
CREATE TABLE "JoinClubRegistration" (
    "id" TEXT NOT NULL,
    "childName" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "parentGuardianName" TEXT NOT NULL,
    "relationToChild" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "secondaryContactNumber" TEXT,
    "message" TEXT,
    "address" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JoinClubRegistration_pkey" PRIMARY KEY ("id")
);
