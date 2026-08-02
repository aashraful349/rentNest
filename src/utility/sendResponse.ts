import { Response } from "express";
import { TResponseData } from "./util.interface";


const sendResponse=<T>(res:Response,data:TResponseData<T>)=>{
    res.status(data.status).json(
        {
            success:data.success,
            message:data.message,
            data:data.data
        }
    )
}

export default sendResponse;