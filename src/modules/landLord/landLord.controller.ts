import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { landLordService } from "./landLord.service";
import sendResponse from "../../utility/sendResponse";





const createProperty=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const payload=req.body;
    const userId=req.user?.userId as string;
    const result=await landLordService.createPropertyIntoDB(payload,userId)
    // console.log("result:",result)
    sendResponse(res,{
        success:true,
        status:200,
        message:"Property created successfully",
        data:result
    })
})

const updateProperty=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const payload=req.body;
})


export const landLordController={
    createProperty,
    updateProperty
}