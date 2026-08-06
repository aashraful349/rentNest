import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import { authRoutes } from "./modules/auth/auth.route";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import cors from "cors";
import config from "./config";
import { landLordRoute } from "./modules/landLord/landLord.route";
import { propertiesRoute } from "./modules/properties/properties.route";
import { categoriesRoute } from "./modules/categories/categories.route";
import { rentalRequestRoute } from "./rentalRequest/rentalRequest.route";

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

app.use("/api/landlord",landLordRoute);

app.use("/api/properties",propertiesRoute);

app.use("/api/categories",categoriesRoute);

app.use("/api/rentals",rentalRequestRoute);



app.use(notFound)
app.use(globalErrorHandler)



export default app;