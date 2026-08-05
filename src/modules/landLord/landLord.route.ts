import { Router } from "express";
import { landLordController } from "./landLord.controller";
import { auth } from "../../middleware/auth";


const router=Router();

router.post("/properties", auth("LANDLORD") ,landLordController.createProperty)

router.put("/properties/:id",auth("LANDLORD"),landLordController.updateProperty)

router.delete("/properties/:id",auth("LANDLORD"),landLordController.deleteProperty)

export const landLordRoute=router;