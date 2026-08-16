import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { paymentService } from "./payment.service";
import sendResponse from "../../utility/sendResponse";

const createPaymentSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId as string;
    const rentalRequestId = req.body?.rentalRequestId as string;

    const result = await paymentService.createPaymentSession(
      userId,
      rentalRequestId,
    );

    sendResponse(res, {
      status: 200,
      success: true,
      message: "Payment session created successfully",
      data: result,
    });
  },
);

const handleWebhook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let event = req.body as Buffer;
    console.log("stripe request body:", event);
    console.log(req.headers, "stripe req headers");
    const signature = req.headers['stripe-signature'] as string;

    await paymentService.handleWebhook(event, signature);

            sendResponse(res,{
            success:true,
            status:200,
            message:"Webhook received successfully",
            data:null
        })
  },
);

export const paymentController = {
  createPaymentSession,
  handleWebhook,
};
