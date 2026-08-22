import { prisma } from "../../lib/prisma";
export const handleCheckoutCompleted = async (session) => {
    // console.log("session after checkout completed:", session.metadata);
    const userId = session.metadata?.tenantId;
    const rentalRequestId = session.metadata?.rentalRequestId;
    const propertyId = session.metadata?.propertyId;
    // console.log("userId:",userId,"rentalRequestId:",rentalRequestId,"propertyId:",propertyId);
    const stripeCustomerId = session.customer;
    const stripePaymentId = session.payment_intent;
    const amount = session.amount_total / 100;
    // console.log(session)
    //   console.log("userId:", userId, "rentalRequestId:", rentalRequestId, "propertyId:", propertyId, "stripeCustomerId:", stripeCustomerId, "stripePaymentIntentId:", stripePaymentIntentId);
    await prisma.payment.upsert({
        where: {
            rentalRequestId,
        },
        create: {
            userId,
            rentalRequestId,
            stripeCustomerId,
            stripePaymentId,
            amount,
            status: "COMPLETED",
        },
        update: {
            rentalRequestId,
            stripeCustomerId,
            stripePaymentId,
            amount,
            status: "COMPLETED",
        },
    });
};
//# sourceMappingURL=payment.utils.js.map