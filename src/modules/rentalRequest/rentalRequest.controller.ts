import { Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { rentalRequestService } from "./rentalRequest.service";
import sendResponse from "../../utility/sendResponse";
import { AppError } from "../../utility/AppError";
import httpStatus from "http-status";

const createRentalRequest = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.userId as string;
  const payload = req.body;

  if (!tenantId) {
    throw new AppError("User Id not found..Please login first", httpStatus.UNAUTHORIZED);
  }

  if (!payload?.propertyId) {
    throw new AppError("Property ID is required", httpStatus.BAD_REQUEST);
  }

  const result = await rentalRequestService.createRentalRequestInDB(tenantId, payload);

  sendResponse(res, {
    success: true,
    status: 201,
    message: "Rental request created successfully",
    data: result,
  });
});

const getAllRentalRequests = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.userId as string;

  if (!tenantId) {
    throw new AppError("User Id not found..Please login first", httpStatus.UNAUTHORIZED);
  }

  const result = await rentalRequestService.getAllRentalRequestsFromDB(tenantId);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Rental requests fetched successfully",
    data: result,
  });
});

const getRentalRequestById = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.userId as string;
  const { id } = req.params;

  if (!tenantId) {
    throw new AppError("User Id not found..Please login first", httpStatus.UNAUTHORIZED);
  }

  const result = await rentalRequestService.getRentalRequestByIdFromDB(tenantId, id);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Rental request fetched successfully",
    data: result,
  });
});

export const rentalRequestController = {
  createRentalRequest,
  getAllRentalRequests,
  getRentalRequestById,
};
