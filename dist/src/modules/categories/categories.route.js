import { Router } from "express";
import { categoriesController } from "./categories.controller";
const router = Router();
router.get("/", categoriesController.getAllCategories);
export const categoriesRoute = router;
//# sourceMappingURL=categories.route.js.map