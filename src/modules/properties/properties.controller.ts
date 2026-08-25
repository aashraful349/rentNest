import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { propertiesService } from "./properties.service";
import sendResponse from "../../utility/sendResponse";
import { AppError } from "../../utility/AppError";
import httpStatus from "http-status";



const getAllProperties=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const filterQuery=req.query;
    // console.log(typeof filterQuery.price);

    const result=await propertiesService.getAllPropertiesFromDB(filterQuery)
    // console.log("result:",result)

    sendResponse(res,{
        success:true,
        status:200,
        message:"Properties fetched successfully",
        data:result
    })

})

const getPropertyById=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const id=req.params?.id as string;
    // console.log(typeof filterQuery.price);
    // console.log("id:",id)

    if(!id){
        throw new AppError("Property ID is required..Provide in in the URL", httpStatus.BAD_REQUEST);
    }

    const result=await propertiesService.getPropertyByIdFromDB(id)
    // console.log("result:",result)

    sendResponse(res,{
        success:true,
        status:200,
        message:"Property fetched successfully",
        data:result
    })

})



export const propertiesController={
    getAllProperties,
    getPropertyById
}