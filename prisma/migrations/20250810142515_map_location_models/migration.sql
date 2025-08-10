/*
  Warnings:

  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LocationLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LocationLogImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Location" DROP CONSTRAINT "Location_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LocationLog" DROP CONSTRAINT "LocationLog_locationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LocationLog" DROP CONSTRAINT "LocationLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LocationLogImage" DROP CONSTRAINT "LocationLogImage_locationlogId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LocationLogImage" DROP CONSTRAINT "LocationLogImage_userId_fkey";

-- DropTable
DROP TABLE "public"."Location";

-- DropTable
DROP TABLE "public"."LocationLog";

-- DropTable
DROP TABLE "public"."LocationLogImage";

-- CreateTable
CREATE TABLE "public"."location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."locationLog" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3) NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,

    CONSTRAINT "locationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."locationLogImage" (
    "id" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "locationlogId" TEXT NOT NULL,

    CONSTRAINT "locationLogImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "location_slug_key" ON "public"."location"("slug");

-- AddForeignKey
ALTER TABLE "public"."location" ADD CONSTRAINT "location_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."locationLog" ADD CONSTRAINT "locationLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."locationLog" ADD CONSTRAINT "locationLog_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."locationLogImage" ADD CONSTRAINT "locationLogImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."locationLogImage" ADD CONSTRAINT "locationLogImage_locationlogId_fkey" FOREIGN KEY ("locationlogId") REFERENCES "public"."locationLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
