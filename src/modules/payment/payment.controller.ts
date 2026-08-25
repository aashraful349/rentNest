import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { paymentService } from "./payment.service";
import sendResponse from "../../utility/sendResponse";
import { send } from "node:process";
import httpStatus from "http-status";
import { AppError } from "../../utility/AppError";

const createPaymentSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId as string;
    const rentalRequestId = req.body?.rentalRequestId as string;

    if(!userId){
        throw new AppError("Please try logging in again", httpStatus.BAD_REQUEST);
    }

    if(!rentalRequestId){
        throw new AppError(`Rental request ID is required.Enter it in the given format: "rentalRequestId":"<rental_request_id>"`, httpStatus.BAD_REQUEST);
    }

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



const getPaymentHistory=catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
  const id=req.user?.userId as string;
  if(!id){
    throw new AppError("Please try logging in again", httpStatus.BAD_REQUEST);
  }
  const result=await paymentService.getPaymentHistoryFromDB(id);


  sendResponse(res,{
    success:true,
    status:200,
    message:"Payment history fetched successfully",
    data:result
  })
  
})


const getPaymentDetailsById=catchAsync(async (req: Request, res: Response, next: NextFunction)=>{

  const paymentID=req.params.id as string;
  const userId=req.user?.userId as string;

  if(!userId){
    throw new AppError("Please try logging in again", httpStatus.BAD_REQUEST);
  }

  if(!paymentID){
    throw new AppError("Payment ID is required..Provide in in the URL", httpStatus.BAD_REQUEST);
  }

  const result=await paymentService.getPaymentDetailsByIdFromDB(userId,paymentID);

  // console.log(result)
  sendResponse(res,{
    success:true,
    status:200,
    message:"Payment details fetched successfully",
    data:result
  })
})

export const paymentController = {
  createPaymentSession,
  handleWebhook,
  getPaymentHistory,
  getPaymentDetailsById
};
