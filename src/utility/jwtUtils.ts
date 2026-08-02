import { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const createToken=(payLoad:JwtPayload,secret:string,expiresIn:SignOptions)=>{
    const token=jwt.sign(payLoad,secret,expiresIn)
    return token;
}


export const jwtUtils={
    createToken
}