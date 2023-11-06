/*
  Warnings:

  - Added the required column `bookingId` to the `planReviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "planReviews" ADD COLUMN     "bookingId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "planReviews" ADD CONSTRAINT "planReviews_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
