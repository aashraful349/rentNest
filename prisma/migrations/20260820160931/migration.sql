/*
  Warnings:

  - Added the required column `amount` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Payment_userId_key";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;
