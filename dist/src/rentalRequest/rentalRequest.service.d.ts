import { rentalRequestPayload } from "./rentalRequest.interface";
declare const createRentalRequestInDB: (tenantId: string, payload: rentalRequestPayload) => Promise<{
    id: string;
    propertyId: string;
    tenantId: string;
    message: string | null;
    status: import("../../generated/prisma/enums").Status;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getAllRentalRequestsFromDB: () => Promise<{
    id: string;
    propertyId: string;
    tenantId: string;
    message: string | null;
    status: import("../../generated/prisma/enums").Status;
    createdAt: Date;
    updatedAt: Date;
}[]>;
declare const getRentalRequestByIdFromDB: (id: string) => Promise<{
    id: string;
    propertyId: string;
    tenantId: string;
    message: string | null;
    status: import("../../generated/prisma/enums").Status;
    createdAt: Date;
    updatedAt: Date;
} | null>;
export declare const rentalRequestService: {
    createRentalRequestInDB: typeof createRentalRequestInDB;
    getAllRentalRequestsFromDB: typeof getAllRentalRequestsFromDB;
    getRentalRequestByIdFromDB: typeof getRentalRequestByIdFromDB;
};
export {};
//# sourceMappingURL=rentalRequest.service.d.ts.map