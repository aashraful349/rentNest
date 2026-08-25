import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { adminService } from "./admin.service";
import sendResponse from "../../utility/sendResponse";
import { ActiveStatus } from "../../../generated/prisma/enums";
import httpStatus from "http-status";
import { AppError } from "../../utility/AppError";




const getAllUsers=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    // console.log("getAllUsers called") 
    const result=await adminService.getAllUsers();

    // console.log("result:",result)
    sendResponse(res,{
        success:true,
        status:httpStatus.OK,
        message:"Users fetched successfully",
        data:result
    })
})

const updateUserStatus=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const userId=req.params?.id as string;
    const status=req.body?.status as ActiveStatus;

    if(!userId){
        throw new AppError("Please try logging in again", httpStatus.BAD_REQUEST);
    }

    if(!status){
        throw new AppError("Status is required", httpStatus.BAD_REQUEST);
    }

    // console.log("userId:",userId)
    const result=await adminService.updateUserStatus(userId,status);
    // console.log("result:",result)
    sendResponse(res,{
        success:true,
        status:200,
        message:"User status updated successfully",
        data:result
    })

})


const getAllProperties=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const result=await adminService.getAllProperties();
    sendResponse(res,{
        success:true,
        status:httpStatus.OK,
        message:"Properties fetched successfully",
        data:result
    })
})

const getAllRentalRequests=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const result=await adminService.getAllRentalRequests();
    sendResponse(res,{
        success:true,
        status:httpStatus.OK,
        message:"Rental requests fetched successfully",
        data:result
    })
})


export const adminController={
    getAllUsers,
    updateUserStatus,
    getAllProperties,
    getAllRentalRequests
}
