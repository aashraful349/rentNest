import { Request } from "express";
import { PType, Status } from "../../../generated/prisma/enums";
import { CreatePropertyPayload, updatePropertyPayload } from "./landLord.interface";
declare const createPropertyIntoDB: (payload: CreatePropertyPayload, landLordId: string) => Promise<{
    category: {
        description: string | null;
        id: string;
        type: PType;
    } | null;
    id: string;
    landLordId: string;
    pDescription: string;
    pImage: string | null;
    pLocation: string;
    pName: string;
    pPrice: import("@prisma/client-runtime-utils").Decimal;
}>;
declare const updatePropertyInDB: (req: Request, id: string, payload: updatePropertyPayload) => Promise<{
    category: {
        description: string | null;
        id: string;
        type: PType;
    } | null;
    id: string;
    landLordId: string;
    pDescription: string;
    pImage: string | null;
    pLocation: string;
    pName: string;
    pPrice: import("@prisma/client-runtime-utils").Decimal;
}>;
declare const deletePropertyFromDB: (userId: string, id: string) => Promise<void>;
declare const rentalRequestsForLandLordsPropertiesFromDB: (landLordId: string) => Promise<{
    createdAt: Date;
    id: string;
    message: string | null;
    propertyId: string;
    status: Status;
    tenantId: string;
    updatedAt: Date;
}[]>;
declare const approveOrRejectRentalRequestInDB: (userId: string, rentalRequestId: string, payload: Status) => Promise<{
    id: string;
    propertyId: string;
    tenantId: string;
    message: string | null;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const landLordService: {
    createPropertyIntoDB: typeof createPropertyIntoDB;
    updatePropertyInDB: typeof updatePropertyInDB;
    deletePropertyFromDB: typeof deletePropertyFromDB;
    rentalRequestsForLandLordsPropertiesFromDB: typeof rentalRequestsForLandLordsPropertiesFromDB;
    approveOrRejectRentalRequestInDB: typeof approveOrRejectRentalRequestInDB;
};
export {};
//# sourceMappingURL=landLord.service.d.ts.map