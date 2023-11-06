/*
  Warnings:

  - Added the required column `totalAmount` to the `payouts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payouts" ADD COLUMN     "totalAmount" INTEGER NOT NULL;
