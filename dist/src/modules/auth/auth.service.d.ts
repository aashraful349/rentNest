import { LoginUserPayload, RegisterUserPayload } from "./auth.interface";
import { ActiveStatus, Role } from "../../../generated/prisma/enums";
declare const registerUserDB: (payload: RegisterUserPayload) => Promise<{
    activeStatus: ActiveStatus | null;
    bio: string | null;
    createdAt: Date;
    email: string;
    id: string;
    image: string | null;
    name: string;
    phone: string | null;
    role: Role;
    updatedAt: Date;
}>;
declare const loginUserFromDB: (payload: LoginUserPayload) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
declare const getMeFromDB: (userId: string) => Promise<{
    activeStatus: ActiveStatus | null;
    bio: string | null;
    createdAt: Date;
    email: string;
    id: string;
    image: string | null;
    name: string;
    phone: string | null;
    role: Role;
    updatedAt: Date;
}>;
export declare const authService: {
    registerUserDB: typeof registerUserDB;
    loginUserFromDB: typeof loginUserFromDB;
    getMeFromDB: typeof getMeFromDB;
};
export {};
//# sourceMappingURL=auth.service.d.ts.map