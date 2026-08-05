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
    const id=req.params?.id as string;

    const result=await landLordService.updatePropertyInDB(req,id,payload);

    sendResponse(res,{
        success:true,
        status:200,
        message:"Property updated successfully",
        data:result
    })

})


const deleteProperty=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const id=req.params?.id as string;
    await landLordService.deletePropertyFromDB(id);

    sendResponse(res,{
        success:true,
        status:200,
        message:"Property deleted successfully",
    })


})


export const landLordController={
    createProperty,
    updateProperty,
    deleteProperty
}