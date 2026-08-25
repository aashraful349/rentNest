import { IReview } from "./reviews.interface";
declare const createReview: (payload: IReview, userId: string) => Promise<{
    id: string;
    tenantId: string;
    propertyId: string;
    rentalRequestId: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getAllReviewsByPropertyId: (propertyId: string) => Promise<({
    user: {
        email: string;
        name: string;
    };
} & {
    id: string;
    tenantId: string;
    propertyId: string;
    rentalRequestId: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare const reviewService: {
    createReview: typeof createReview;
    getAllReviewsByPropertyId: typeof getAllReviewsByPropertyId;
};
export {};
//# sourceMappingURL=reviews.service.d.ts.map