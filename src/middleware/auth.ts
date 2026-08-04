import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import { access } from "node:fs";
import config from "../config";
import { jwtUtils } from "../utility/jwtUtils";
import { catchAsync } from "../utility/catchAsync";
import { prisma } from "../lib/prisma";
import { JwtPayload } from "jsonwebtoken";


declare global{
    namespace Express{
        interface Request{
            user?:{
                userId:string,
                name:string,
                email:string,
                role:Role,
            }
        }
    }
}



export const auth = (...requiredRoles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer")
        ? req.headers.authorization?.split(" ")[1]
        : req.headers.authorization;

    if (!accessToken) {
      throw new Error("Access denied. Please login to access this resource.");
    }
    // console.log("accessToken:",accessToken)
    const jwtAccessSecret = config.jwt_access_secret as string;

    const decodedToken = jwtUtils.compareTokenResult(
      accessToken,
      jwtAccessSecret,
    );

    // console.log("decodedToken:",decodedToken)

    if (!decodedToken.success) {
      throw new Error("Invalid or expired access token. Please login again.");
    }

    const userData = decodedToken.data as JwtPayload;
    // console.log("userData:",userData)


    if (requiredRoles.length && !requiredRoles.includes(userData.role)) {
      throw new Error("You do not have permission to access this resource.");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userData.id,
        email: userData.email,
      }
    });
    // console.log("user:", user);
    if(!user){
        throw new Error("User not found. Please login again or create an account.");
    }

    if(user.activeStatus==="BLOCKED"){
        throw new Error("Your account has been blocked. Please contact support for assistance.");
    }

    req.user={
        userId:userData.userId,
        name:userData.name,
        email:userData.email,
        role:userData.role,
    }

// console.log("req.user:",req.user)
    next();


  });
};
