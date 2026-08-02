import { NextFunction, Request, RequestHandler, Response } from "express"
import { catchAsync } from "../../utility/catchAsync"
import sendResponse from "../../utility/sendResponse";



const registerUser=
    catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const {name,email,password}=req.body;
        console.log("User registration data:", { name, email, password });
        sendResponse(res,{
            success:true,
            status:200,
            message:"User registered successfully",
        })
    })




export const authController={
    registerUser
}