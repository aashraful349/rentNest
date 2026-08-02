import { NextFunction, Request, Response } from "express";




export const globalErrorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{
  let statusCode = err.status || 500;
  let message = err.message || "Internal Server Error";


  res.status(statusCode).json({
    success: false,
    name: err.name || "Error",
    message:err.message || "Internal Server Error",
    error: err.stack
  });
}