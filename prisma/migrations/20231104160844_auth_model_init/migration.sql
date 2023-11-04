-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user', 'super_admin', 'agency');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('active', 'deleted', 'suspended');

-- CreateTable
CREATE TABLE "auth" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "accountStatus" "AccountStatus" NOT NULL DEFAULT 'active',

    CONSTRAINT "auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agencies" (
    "id" SERIAL NOT NULL,
    "authId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "profilePic" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "totalStar" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "rating" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "location" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "authId" INTEGER NOT NULL,
    "profilePic" TEXT,
    "name" TEXT,
    "contactNo" TEXT,
    "about" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_email_key" ON "auth"("email");

-- AddForeignKey
ALTER TABLE "agencies" ADD CONSTRAINT "agencies_authId_fkey" FOREIGN KEY ("authId") REFERENCES "auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_authId_fkey" FOREIGN KEY ("authId") REFERENCES "auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
