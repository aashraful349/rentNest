import { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const createToken = (
  payLoad: JwtPayload,
  secret: string,
  expiresIn: SignOptions,
) => {
  const token = jwt.sign(payLoad, secret, expiresIn);
  return token;
};

const compareTokenResult = (token: string, secret: string) => {
  try {
    const decodedToken = jwt.verify(token, secret);
    return {
        success:true,
        data:decodedToken,
    };
  } catch (error) {
    return {
        success:false,
    };
  }
};

export const jwtUtils = {
  createToken,
  compareTokenResult,
};
