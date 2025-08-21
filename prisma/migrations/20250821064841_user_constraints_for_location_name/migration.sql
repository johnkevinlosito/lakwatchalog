/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `location` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "location_name_userId_key" ON "public"."location"("name", "userId");
