import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import { authRoutes } from "./modules/auth/auth.route";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import cors from "cors";
import config from "./config";

const app:Application = express();

app.use(cors({
    origin: config.app_url,
    credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.get("/",(req:Request,res:Response)=>{
    res.send("Welcome to RentNest API");
})

app.use("/api/auth",authRoutes);





app.use(notFound)
app.use(globalErrorHandler)



export default app;