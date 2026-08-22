import { Router } from "express";
import { reviewController } from "./reviews.controller";
import { auth } from "../../middleware/auth";
const router = Router();
router.post("/", auth("TENANT"), reviewController.createReview);
export const reviewRoute = router;
//# sourceMappingURL=reviews.route.js.map