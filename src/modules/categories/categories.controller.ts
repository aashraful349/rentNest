import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import sendResponse from "../../utility/sendResponse";
import { categoriesService } from "./categories.service";



const getAllCategories=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const result=await categoriesService.getAllCategoriesFromDB();
    // console.log("result:",result)

    sendResponse(res,{
        success:true,
        status:200,
        message:"Categories fetched successfully",
        data:result
    })

})

export const categoriesController={
    getAllCategories
}