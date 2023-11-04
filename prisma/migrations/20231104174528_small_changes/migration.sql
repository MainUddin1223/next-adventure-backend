/*
  Warnings:

  - You are about to drop the column `profilePic` on the `agencies` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `profileImg` to the `agencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `auth` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_authId_fkey";

-- AlterTable
ALTER TABLE "agencies" DROP COLUMN "profilePic",
ADD COLUMN     "profileImg" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "auth" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "authId" INTEGER NOT NULL,
    "profileImg" TEXT,
    "name" TEXT,
    "contactNo" TEXT,
    "about" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_authId_fkey" FOREIGN KEY ("authId") REFERENCES "auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
