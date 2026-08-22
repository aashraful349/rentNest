type CreateReviewPayload = {
    rentalRequestId?: unknown;
    title?: unknown;
    description?: unknown;
};
declare const createReview: (tenantId: string, payload: CreateReviewPayload) => Promise<{
    id: string;
    tenantId: string;
    propertyId: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const reviewService: {
    createReview: typeof createReview;
};
export {};
//# sourceMappingURL=reviews.service.d.ts.map