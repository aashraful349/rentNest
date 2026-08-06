import { Router } from "express";
import { rentalRequestController } from "./rentalRequest.controller";
import { auth } from "../middleware/auth";



const router = Router();


router.post("/",auth("TENANT","ADMIN"),rentalRequestController.createRentalRequest)

router.get("/",auth("TENANT","ADMIN"),rentalRequestController.getAllRentalRequests)

router.get("/:id",auth("TENANT","ADMIN"),rentalRequestController.getRentalRequestById)



export const rentalRequestRoute=router;