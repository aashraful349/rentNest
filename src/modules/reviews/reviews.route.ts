import { Router } from "express";
import { reviewController } from "./reviews.controller";
import { auth } from "../../middleware/auth";


const router=Router()


router.post("/",auth("TENANT"),reviewController.createReview)
router.get("/:propertyId",reviewController.getReviewsByPropertyId)

export const reviewRoute=router;