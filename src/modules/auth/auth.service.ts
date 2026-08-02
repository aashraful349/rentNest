import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./auth.interface";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";

const registerUserDB = async (payload: RegisterUserPayload) => {
  const { name, email, password, image, bio, phone, role } = payload;

  const allowedRoles = Object.values(Role);
  const normalizedRole = role?.trim().toUpperCase() as Role;

  if (
    normalizedRole === Role.ADMIN ||
    !normalizedRole ||
    !allowedRoles.includes(normalizedRole)
  ) {
    throw new Error(
      "Invalid role provided. Role must be TENANT, tenant, LANDLORD or landlord.",
    );
  }

  const doesUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (doesUserExist) {
    throw new Error("User already exists with this email");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );
  // console.log("payload",payload)

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      image: image ? image : "Image not provided",
      bio: bio ? bio : "Bio not provided",
      phone: phone ? phone : "Phone not provided",
      role: normalizedRole,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      bio: true,
      phone: true,
      role: true,
      activeStatus: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  //   const result = await prisma.user.findUnique({
  //     where: {
  //       id: createdUser.id,
  //       email: createdUser.email,
  //     },
  //     omit: {
  //       password: true,
  //     },
  //   });

  return createdUser;
};

export const authService = {
  registerUserDB,
};
