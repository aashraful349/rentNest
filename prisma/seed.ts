import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
  const password = await bcrypt.hash("Password123!", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@rentnest.test" },
    update: {},
    create: {
      name: "RentNest Admin",
      email: "admin@rentnest.test",
      hashedPassword: password,
      role: "ADMIN",
    },
  });

  const landlord = await prisma.user.upsert({
    where: { email: "landlord@rentnest.test" },
    update: {},
    create: {
      name: "Sample Landlord",
      email: "landlord@rentnest.test",
      hashedPassword: password,
      role: "LANDLORD",
    },
  });

  await prisma.user.upsert({
    where: { email: "tenant@rentnest.test" },
    update: {},
    create: {
      name: "Sample Tenant",
      email: "tenant@rentnest.test",
      hashedPassword: password,
      role: "TENANT",
    },
  });

  await prisma.property.upsert({
    where: { id: "11111111-1111-4111-8111-111111111111" },
    update: {},
    create: {
      id: "11111111-1111-4111-8111-111111111111",
      landLordId: landlord.id,
      pName: "Sample Apartment",
      pLocation: "Dhaka",
      pPrice: "25000.00",
      pDescription: "A sample property for API testing.",
      category: {
        create: {
          type: "APARTMENT",
          description: "Sample category",
        },
      },
    },
  });

  console.log(`Seeded admin: ${admin.email}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });