import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { ActiveStatus, Role } from "../../../generated/prisma/enums";
import { jwtUtils } from "../../utility/jwtUtils";
import { AppError } from "../../utility/AppError";
import httpStatus from "http-status";
const registerUserDB = async (payload) => {
    const { name, email, password, image, bio, phone, role } = payload;
    const allowedRoles = Object.values(Role);
    const normalizedRole = role?.trim().toUpperCase();
    if (normalizedRole === Role.ADMIN ||
        !normalizedRole ||
        !allowedRoles.includes(normalizedRole)) {
        throw new AppError("Invalid role provided. Role must be TENANT, tenant, LANDLORD or landlord.", httpStatus.BAD_REQUEST);
    }
    const doesUserExist = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (doesUserExist) {
        throw new AppError("User already exists with this email", httpStatus.CONFLICT);
    }
    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
    // console.log("payload",payload)
    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword,
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
const loginUserFromDB = async (payload) => {
    const { email, password } = payload;
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email,
        },
    });
    //   console.log("user:",user)
    if (user.activeStatus === ActiveStatus.BLOCKED) {
        throw new AppError("User is blocked. Please contact support.", httpStatus.FORBIDDEN);
    }
    const didPasswordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!didPasswordMatch) {
        throw new AppError("Invalid credentials. Please check your email and password.", httpStatus.UNAUTHORIZED);
    }
    const jwtPayload = {
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
    const jwtAccessSecret = config.jwt_access_secret;
    const jwtRefreshSecret = config.jwt_refresh_secret;
    const accessToken = jwtUtils.createToken(jwtPayload, jwtAccessSecret, {
        expiresIn: "1d",
    });
    const refreshToken = jwtUtils.createToken(jwtPayload, jwtRefreshSecret, {
        expiresIn: "7d",
    });
    // console.log("accessToken:",accessToken)
    // console.log("refreshToken:",refreshToken)
    return { accessToken, refreshToken };
};
const getMeFromDB = async (userId) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
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
    return user;
};
export const authService = {
    registerUserDB,
    loginUserFromDB,
    getMeFromDB,
};
//# sourceMappingURL=auth.service.js.map