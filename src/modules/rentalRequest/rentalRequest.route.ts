import { Router } from "express";
import { rentalRequestController } from "./rentalRequest.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/", auth("TENANT"), rentalRequestController.createRentalRequest);

router.get("/", auth("TENANT"), rentalRequestController.getAllRentalRequests);

router.get(
  "/:id",
  auth("TENANT"),
  rentalRequestController.getRentalRequestById,
);

export const rentalRequestRoute = router;
