import { ActiveStatus } from "../../../generated/prisma/enums";
declare const getAllUsers: () => Promise<{
    activeStatus: ActiveStatus | null;
    createdAt: Date;
    email: string;
    id: string;
    name: string;
    role: import("../../../generated/prisma/enums").Role;
}[]>;
declare const updateUserStatus: (userId: string, status: ActiveStatus) => Promise<{
    activeStatus: ActiveStatus | null;
    createdAt: Date;
    email: string;
    id: string;
    name: string;
    role: import("../../../generated/prisma/enums").Role;
    updatedAt: Date;
}>;
declare const getAllProperties: () => Promise<{
    createdAt: Date;
    id: string;
    landLordId: string;
    pDescription: string;
    pLocation: string;
    pName: string;
    pPrice: import("@prisma/client-runtime-utils").Decimal;
}[]>;
declare const getAllRentalRequests: () => Promise<{
    createdAt: Date;
    id: string;
    propertyId: string;
    status: import("../../../generated/prisma/enums").Status;
    tenantId: string;
}[]>;
export declare const adminService: {
    getAllUsers: typeof getAllUsers;
    updateUserStatus: typeof updateUserStatus;
    getAllProperties: typeof getAllProperties;
    getAllRentalRequests: typeof getAllRentalRequests;
};
export {};
//# sourceMappingURL=admin.service.d.ts.map