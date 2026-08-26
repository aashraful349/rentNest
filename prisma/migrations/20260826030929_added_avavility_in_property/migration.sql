-- CreateEnum
CREATE TYPE "PAvailability" AS ENUM ('AVAILABLE', 'UNAVAILABLE');

-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "availability" "PAvailability" NOT NULL DEFAULT 'AVAILABLE';
