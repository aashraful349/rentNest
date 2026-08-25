import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { rentalRequestService } from "./rentalRequest.service";
import sendResponse from "../../utility/sendResponse";
import { AppError } from "../../utility/AppError";
import httpStatus from "http-status";

const createRentalRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tenantId = req.user?.userId as string;
    if (!tenantId) {
      throw new AppError("Tenant Id not found", httpStatus.NOT_FOUND);
    }
    const payload = req.body;

    if(!payload){
      throw new AppError("Request body is required", httpStatus.BAD_REQUEST);
    }
    
    if(!payload.propertyId){
      throw new AppError("Property ID not provided. It is required.", httpStatus.BAD_REQUEST);
    }



    const result = await rentalRequestService.createRentalRequestInDB(
      tenantId,
      payload,
    );

    // console.log("result:",result)
    sendResponse(res, {
      success: true,
      status: 200,
      message: "Rental request created successfully",
      data: result,
    });
  },
);

const getAllRentalRequests = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId as string;
    if (!userId) {
      throw new AppError("User Id not found..Please login first", httpStatus.UNAUTHORIZED);
    }

    const result =
      await rentalRequestService.getAllRentalRequestsFromDB(userId);

    // console.log("result:",result)
    sendResponse(res, {
      success: true,
      status: 200,
      message: "Rental requests fetched successfully",
      data: result,
    });
  },
);

const getRentalRequestById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params?.id as string;
    const userId = req.user?.userId as string;
    if (!userId) {
      throw new AppError("User Id not found..Please login first", httpStatus.UNAUTHORIZED);
    }
    if (!id) {
      throw new AppError(
        "Rental request ID is required..Provide in in the URL",
        httpStatus.BAD_REQUEST,
      );
    }

    const result = await rentalRequestService.getRentalRequestByIdFromDB(
      userId,
      id,
    );

    // console.log("result:",result)
    sendResponse(res, {
      success: true,
      status: 200,
      message: "Rental request fetched successfully",
      data: result,
    });
  },
);

export const rentalRequestController = {
  createRentalRequest,
  getAllRentalRequests,
  getRentalRequestById,
};
