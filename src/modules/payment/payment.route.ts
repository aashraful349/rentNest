import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middleware/auth";



const router=Router();

router.post("/create",auth("TENANT"),paymentController.createPaymentSession);


router.post("/webhook",paymentController.handleWebhook)

router.get("/",auth("TENANT"),paymentController.getPaymentHistory)

router.get("/:id",auth("TENANT"),paymentController.getPaymentDetailsById)

export const paymentRoute=router;