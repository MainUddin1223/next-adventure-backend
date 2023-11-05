/*
  Warnings:

  - You are about to drop the column `contactInfo` on the `agencies` table. All the data in the column will be lost.
  - Added the required column `contactNo` to the `agencies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "agencies" DROP COLUMN "contactInfo",
ADD COLUMN     "contactNo" TEXT NOT NULL;
