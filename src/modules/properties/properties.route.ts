import { Router } from "express";
import { authController } from "../auth/auth.controller";
import { propertiesController } from "./properties.controller";



const router=Router()

router.get("/",propertiesController.getAllProperties)
router.get("/:id",propertiesController.getPropertyById)

export const propertiesRoute=router;