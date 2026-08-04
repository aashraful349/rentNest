/*
  Warnings:

  - The `type` column on the `categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PType" AS ENUM ('APARTMENT', 'HOUSE', 'STUDIO', 'OFFICE', 'SHOP', 'WAREHOUSE', 'LAND', 'OTHER');

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "type",
ADD COLUMN     "type" "PType" NOT NULL DEFAULT 'OTHER';

-- CreateIndex
CREATE INDEX "categories_pId_idx" ON "categories"("pId");
