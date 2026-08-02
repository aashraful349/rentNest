import { Request, Response } from "express";



export const notFound=(req:Request,res:Response)=>{
    res.status(404).json({
        success:false,
        message:"Route not found.Please enter a valid route",
    })
}