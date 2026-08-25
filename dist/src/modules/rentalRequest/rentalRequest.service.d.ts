import { rentalRequestPayload } from "./rentalRequest.interface";
declare const createRentalRequestInDB: (tenantId: string, payload: rentalRequestPayload) => Promise<{
    id: string;
    propertyId: string;
    tenantId: string;
    message: string | null;
    status: import("../../../generated/prisma/enums").Status;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getAllRentalRequestsFromDB: (userId: string) => Promise<{
    createdAt: Date;
    id: string;
    propertyId: string;
    status: import("../../../generated/prisma/enums").Status;
    tenantId: string;
}[]>;
declare const getRentalRequestByIdFromDB: (userId: string, id: string) => Promise<{
    property: {
        id: string;
        pDescription: string;
        pLocation: string;
        pName: string;
        pPrice: import("@prisma/client-runtime-utils").Decimal;
    };
} & {
    id: string;
    propertyId: string;
    tenantId: string;
    message: string | null;
    status: import("../../../generated/prisma/enums").Status;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const rentalRequestService: {
    createRentalRequestInDB: typeof createRentalRequestInDB;
    getAllRentalRequestsFromDB: typeof getAllRentalRequestsFromDB;
    getRentalRequestByIdFromDB: typeof getRentalRequestByIdFromDB;
};
export {};
//# sourceMappingURL=rentalRequest.service.d.ts.map