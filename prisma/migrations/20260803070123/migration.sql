-- CreateEnum
CREATE TYPE "ActiveStatus" AS ENUM ('ACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TENANT', 'LANDLORD', 'ADMIN');

-- CreateTable
CREATE TABLE "properties" (
    "id" TEXT NOT NULL,
    "landLordId" TEXT NOT NULL,
    "pName" VARCHAR(255) NOT NULL,
    "pLocation" VARCHAR(255) NOT NULL,
    "pPrice" DECIMAL(10,2) NOT NULL,
    "pDescription" TEXT NOT NULL,
    "pImage" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "pId" TEXT NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "image" VARCHAR(255),
    "bio" TEXT,
    "phone" VARCHAR(25),
    "activeStatus" "ActiveStatus" DEFAULT 'ACTIVE',
    "role" "Role" NOT NULL DEFAULT 'TENANT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_pId_key" ON "categories"("pId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_landLordId_fkey" FOREIGN KEY ("landLordId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_pId_fkey" FOREIGN KEY ("pId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
