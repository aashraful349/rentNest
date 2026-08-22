import { JwtPayload, SignOptions } from "jsonwebtoken";
declare const createToken: (payLoad: JwtPayload, secret: string, expiresIn: SignOptions) => string;
declare const compareTokenResult: (token: string, secret: string) => {
    success: boolean;
    data: string | JwtPayload;
} | {
    data?: undefined;
    success: boolean;
};
export declare const jwtUtils: {
    createToken: typeof createToken;
    compareTokenResult: typeof compareTokenResult;
};
export {};
//# sourceMappingURL=jwtUtils.d.ts.map