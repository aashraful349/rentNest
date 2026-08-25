import { get } from "node:http";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { handleCheckoutCompleted } from "./payment.utils";
import { AppError } from "../../utility/AppError";
import httpStatus from "http-status";

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
      throw new AppError("Rental request not found", httpStatus.NOT_FOUND);
    }

    if (rentalRequest?.tenantId !== userId) {
      throw new AppError(
        "You are not authorized to make payment for this rental request",
        httpStatus.FORBIDDEN
      );
    }

    if (rentalRequest.status !== "APPROVED") {
      throw new AppError("Rental request is not approved", httpStatus.FORBIDDEN);
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



const handleWebhook = async (payload: Buffer, signature: string, res: any) => {
  const endpointSecret = config.stripe_webhook_secret;
  let event;

  // 1. Catch Stripe verification signature errors safely
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      endpointSecret
    );
  } catch (err: any) {
    console.error(`❌ Stripe Signature Verification Failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 2. Process validated events inside a separate try/catch to protect your DB queries
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        console.log("Processing checkout.session.completed...");
        await handleCheckoutCompleted(event.data.object);
        break;
      default:
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Always send a 200 OK back to Stripe for successfully parsed hooks
    return res.status(200).json({ received: true });

  } catch (dbErr: any) {
    console.error("❌ Database/Fulfillment Error inside webhook:", dbErr.message);
    // Returning a 500 explicitly helps you see the actual code path breakdown in Vercel
    return res.status(500).send(`Fulfillment Error: ${dbErr.message}`);
  }
}



const getPaymentHistoryFromDB=async(id:string)=>{
  const result= await prisma.payment.findMany({
    where: {
      userId: id
    },
    select:{
      id:true,
      userId:true,
      amount:true,
      status:true,
      createdAt:true,
    },
    orderBy:{
      createdAt:"desc"
    }
  })

  // console.log("payment history result:",result)

  if(result.length===0){
    throw new AppError("No payment history found for this user", httpStatus.NOT_FOUND);
  }

  if(result[0]!.userId!==id){
    throw new AppError("You are not authorized to view this payment details", httpStatus.FORBIDDEN);
  }

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
          email:true,
          role:true
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

  if(result.userId!==userId){
    throw new AppError("You are not authorized to view this payment details", httpStatus.FORBIDDEN);
  }

  return result;

}






export const paymentService = {
  createPaymentSession,
  handleWebhook,
  getPaymentHistoryFromDB,
  getPaymentDetailsByIdFromDB
};
