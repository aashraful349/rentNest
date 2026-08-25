import { PType } from "../../../generated/prisma/enums";
import { filterQueryType } from "./properties.interface";
declare const getAllPropertiesFromDB: (filterQuery: filterQueryType) => Promise<{
    category: {
        id: string;
        type: PType;
    } | null;
    createdAt: Date;
    id: string;
    pLocation: string;
    pName: string;
    pPrice: import("@prisma/client-runtime-utils").Decimal;
}[]>;
declare const getPropertyByIdFromDB: (id: string) => Promise<{
    category: {
        id: string;
        pId: string;
        type: PType;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null;
} & {
    id: string;
    landLordId: string;
    pName: string;
    pLocation: string;
    pPrice: import("@prisma/client-runtime-utils").Decimal;
    pDescription: string;
    pImage: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const propertiesService: {
    getAllPropertiesFromDB: typeof getAllPropertiesFromDB;
    getPropertyByIdFromDB: typeof getPropertyByIdFromDB;
};
export {};
//# sourceMappingURL=properties.service.d.ts.map