import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { paymentService } from "./payment.service";




const createPaymentSession=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const userId=req.user?.userId as string;
    const rentalRequestId=req.body?.rentalRequestId as string;

    const result=await paymentService.createPaymentSession(userId,rentalRequestId);

})


export const paymentController={
    createPaymentSession
}