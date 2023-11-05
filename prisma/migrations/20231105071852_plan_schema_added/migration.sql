-- CreateEnum
CREATE TYPE "PlanStatus" AS ENUM ('available', 'closed', 'canceled', 'suspended');

-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "agencyId" INTEGER NOT NULL,
    "planName" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "departureFrom" TEXT NOT NULL,
    "coverLocations" TEXT[],
    "price" DECIMAL(10,2) NOT NULL,
    "images" TEXT[],
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "meals" TEXT NOT NULL,
    "events" TEXT[],
    "notAllowed" TEXT[],
    "deadline" TIMESTAMP(3) NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "PlanStatus" NOT NULL DEFAULT 'available',
    "totalSeats" INTEGER NOT NULL,
    "availableSeat" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
