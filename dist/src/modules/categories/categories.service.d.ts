declare const getAllCategoriesFromDB: () => Promise<{
    id: string;
    pId: string;
    type: import("../../../generated/prisma/enums").PType;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare const categoriesService: {
    getAllCategoriesFromDB: typeof getAllCategoriesFromDB;
};
export {};
//# sourceMappingURL=categories.service.d.ts.map