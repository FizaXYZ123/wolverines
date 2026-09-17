-- CreateTable
CREATE TABLE "JoinOurClub" (
    "id" TEXT NOT NULL,
    "childName" TEXT NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "gender" TEXT NOT NULL,
    "parentGuardianName" TEXT NOT NULL,
    "relationToChild" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "secondaryCountryCode" TEXT,
    "secondaryContactNumber" TEXT,
    "secondaryRelationToChild" TEXT,
    "address" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JoinOurClub_pkey" PRIMARY KEY ("id")
);
