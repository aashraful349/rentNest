declare const createPaymentSession: (userId: string, rentalRequestId: string) => Promise<{
    paymentUrl: string | null;
}>;
declare const handleWebhook: (payload: Buffer, signature: string) => Promise<void>;
declare const getPaymentHistoryFromDB: (id: string) => Promise<{
    amount: number;
    createdAt: Date;
    id: string;
    status: import("../../../generated/prisma/enums").PaymentStatus;
}[]>;
declare const getPaymentDetailsByIdFromDB: (userId: string, paymentID: string) => Promise<{
    rentalRequest: {
        id: string;
        property: {
            id: string;
            pLocation: string;
            pName: string;
            pPrice: import("@prisma/client-runtime-utils").Decimal;
        };
        status: import("../../../generated/prisma/enums").Status;
    };
    user: {
        email: string;
        id: string;
        name: string;
        role: import("../../../generated/prisma/enums").Role;
    };
} & {
    id: string;
    userId: string;
    rentalRequestId: string;
    status: import("../../../generated/prisma/enums").PaymentStatus;
    stripeCustomerId: string;
    stripePaymentId: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const paymentService: {
    createPaymentSession: typeof createPaymentSession;
    handleWebhook: typeof handleWebhook;
    getPaymentHistoryFromDB: typeof getPaymentHistoryFromDB;
    getPaymentDetailsByIdFromDB: typeof getPaymentDetailsByIdFromDB;
};
export {};
//# sourceMappingURL=payment.service.d.ts.map