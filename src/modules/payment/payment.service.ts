import { get } from "node:http";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { handleCheckoutCompleted } from "./payment.utils";

const createPaymentSession = async (
  userId: string,
  rentalRequestId: string,
) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const rentalRequest = await tx.rentalRequest.findUnique({
      where: {
        id: rentalRequestId,
      },
      include: {
        user: true,
        property: true,
        payment: true,
      },
    });

    // console.log("rentalRequest:",rentalRequest)

    if (!rentalRequest) {
      throw new Error("Rental request not found");
    }

    if (rentalRequest?.tenantId !== userId) {
      throw new Error(
        "You are not authorized to make payment for this rental request",
      );
    }

    if (rentalRequest.status !== "APPROVED") {
      throw new Error("Rental request is not approved");
    }
    // console.log("rentalRequest:", rentalRequest);

    const priceInPaisa = Number(rentalRequest.property.pPrice) * 100;

    const normalizedPriceInPaisa = Math.round(priceInPaisa);

    let stripeCustomerId = rentalRequest.payment?.stripeCustomerId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: rentalRequest.user.email,
        name: rentalRequest.user.name,
        metadata: {
          userId: rentalRequest.user.id,
        },
      });
      stripeCustomerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "bdt",
            unit_amount: normalizedPriceInPaisa,
            product_data: {
              name: rentalRequest.property.pName,
              description: `Payment for rentalRequest ${rentalRequest.id}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        propertyId: rentalRequest.property.id,
        rentalRequestId,
        tenantId: rentalRequest.user.id,
      },
      customer: stripeCustomerId,
      success_url: `${config.app_url}/payment?success=true`,
      cancel_url: `${config.app_url}/payment?success=false`,
    });
    return session.url;
  });
  // console.log("transactionResult:", transactionResult);
  return{
    paymentUrl: transactionResult
  }
};



const handleWebhook=async(payload:Buffer,signature:string)=>{
  const endpointSecret = config.stripe_webhook_secret;
  const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      );

      // console.log("event after try block:", event);

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }
}



const getPaymentHistoryFromDB=async(id:string)=>{
  const result= await prisma.payment.findMany({
    where: {
      userId: id
    },
    select:{
      id:true,
      amount:true,
      status:true,
      createdAt:true,
    },
    orderBy:{
      createdAt:"desc"
    }
  })

  // console.log("payment history result:",result)

  return result;


}

const getPaymentDetailsByIdFromDB=async(userId:string,paymentID:string)=>{
  // console.log("userId:",userId,"paymentID:",paymentID)

  const result=await prisma.payment.findUniqueOrThrow({
    where:{
      id:paymentID
    },

    include:{
      user:{
        select:{
          id:true,
          name:true,
          email:true
        }
      },
      rentalRequest:{
        select:{
          id:true,
          status:true,
          property:{
            select:{
              id:true,
              pName:true,
              pLocation:true,
              pPrice:true
            }
          }
        }
      }
    }

  })

  return result;

}






export const paymentService = {
  createPaymentSession,
  handleWebhook,
  getPaymentHistoryFromDB,
  getPaymentDetailsByIdFromDB
};
