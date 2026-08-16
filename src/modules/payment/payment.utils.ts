import Stripe from "stripe";
import { prisma } from "../../lib/prisma";

export const handleCheckoutCompleted = async (
  session: Stripe.Checkout.Session,
) => {
  // console.log("session after checkout completed:", session.metadata);
  const userId = session.metadata?.tenantId as string;
  const rentalRequestId = session.metadata?.rentalRequestId as string;
  const propertyId = session.metadata?.propertyId as string;
  // console.log("userId:",userId,"rentalRequestId:",rentalRequestId,"propertyId:",propertyId);
  const stripeCustomerId = session.customer as string;
  const stripePaymentId = session.payment_intent as string;

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
      status: "COMPLETED",
    },
    update: {
      rentalRequestId,
      stripeCustomerId,
      stripePaymentId,
      status: "COMPLETED",
    },
  });
};
