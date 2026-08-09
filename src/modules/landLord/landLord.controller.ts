import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { landLordService } from "./landLord.service";
import sendResponse from "../../utility/sendResponse";
import { Status } from "../../../generated/prisma/enums";





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


const rentalRequestsForLandLordsProperties=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const landLordId=req.user?.userId as string;
    const result=await landLordService.rentalRequestsForLandLordsPropertiesFromDB(landLordId);
    
    sendResponse(res,{
        success:true,
        status:200,
        message:"Rental requests fetched successfully",
        data:result
    })
})


const approveOrRejectRentalRequest=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const rentalRequestId=req.params?.id as string;
    const payload=req.body.status as Status;

    if(payload!=="APPROVED" && payload!=="REJECTED"){
        throw new Error("Invalid status value. Must be 'APPROVED' or 'REJECTED'.");
    }

    // if(){
    //     throw new Error("Invalid status value. Must be 'APPROVED' or 'REJECTED'.");
    // }

    // try {
    //     payload=req.body as Status;
    // } catch (error) {
    //     throw new Error("Invalid status value. Must be 'APPROVED' or 'REJECTED'.");
    // }
    // console.log(payload);

    const result=await landLordService.approveOrRejectRentalRequestInDB(rentalRequestId,payload);

    // console.log("result:",result)

    sendResponse(res,{
        success:true,
        status:200,
        message:"Rental request status updated successfully",
        data:result
    })

})


export const landLordController={
    createProperty,
    updateProperty,
    deleteProperty,
    rentalRequestsForLandLordsProperties,
    approveOrRejectRentalRequest
}