import { Router } from "express";
import { landLordController } from "./landLord.controller";
import { auth } from "../../middleware/auth";


const router=Router();

router.post("/properties", auth("LANDLORD") ,landLordController.createProperty)

router.put("/properties/:id",landLordController.updateProperty)


export const landLordRoute=router;