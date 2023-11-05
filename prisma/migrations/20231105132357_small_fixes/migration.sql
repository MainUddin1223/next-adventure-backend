/*
  Warnings:

  - You are about to drop the column `availableSeat` on the `Plan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "availableSeat",
ADD COLUMN     "totalBooking" INTEGER NOT NULL DEFAULT 0;
