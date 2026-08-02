import { NextFunction, Request, RequestHandler, Response } from "express"
import { catchAsync } from "../../utility/catchAsync"
import sendResponse from "../../utility/sendResponse";
import { authService } from "./auth.service";
import httpStatus from "http-status";



const registerUser=
    catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const payload=req.body;

        const result= await authService.registerUserDB(payload);
        // console.log("result",result)

        sendResponse(res,{
            success:true,
            status:httpStatus.OK,
            message:"User registered successfully",
            data:result
        })

    })




export const authController={
    registerUser
}