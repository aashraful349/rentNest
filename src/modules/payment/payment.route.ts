import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middleware/auth";



const router=Router();

router.post("/create",auth("TENANT"),paymentController.createPaymentSession);


export const paymentRoute=router;