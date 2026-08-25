import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { landLordService } from "./landLord.service";
import sendResponse from "../../utility/sendResponse";
import { Status } from "../../../generated/prisma/enums";
import { AppError } from "../../utility/AppError";
import httpStatus from "http-status";

const createProperty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const userId = req.user?.userId as string;

    if (!userId) {
      throw new AppError(
        "User Id not found..Please login first",
        httpStatus.UNAUTHORIZED,
      );
    }

    if (!payload) {
      throw new AppError("Request body is required", httpStatus.BAD_REQUEST);
    }

    if (
      !payload.pName ||
      !payload.pLocation ||
      !payload.pPrice ||
      !payload.pDescription ||
      !payload.type
    ) {
      throw new AppError(
        "All fields are required: pName, pLocation, pPrice, pDescription, categoryId, type",
        httpStatus.BAD_REQUEST,
      );
    }
    const result = await landLordService.createPropertyIntoDB(payload, userId);
    // console.log("result:",result)
    sendResponse(res, {
      success: true,
      status: 200,
      message: "Property created successfully",
      data: result,
    });
  },
);

const updateProperty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const id = req.params?.id as string;

    if (!id) {
      throw new AppError(
        "Property ID is required..Provide in in the URL",
        httpStatus.BAD_REQUEST,
      );
    }

    if (!payload) {
      throw new AppError("Request body is required", httpStatus.BAD_REQUEST);
    }

    if (Object.keys(payload).length === 0) {
      throw new AppError("Request body is empty", httpStatus.BAD_REQUEST);
    }

    // console.log("payload:",payload)

    const result = await landLordService.updatePropertyInDB(req, id, payload);

    sendResponse(res, {
      success: true,
      status: 200,
      message: "Property updated successfully",
      data: result,
    });
  },
);

const deleteProperty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId as string;
    const id = req.params?.id as string;
    await landLordService.deletePropertyFromDB(userId, id);

    if (!id) {
      throw new AppError(
        "Property ID is required..Provide in in the URL",
        httpStatus.BAD_REQUEST,
      );
    }

    if (!userId) {
      throw new AppError(
        "User Id not found..Please login first",
        httpStatus.UNAUTHORIZED,
      );
    }

    sendResponse(res, {
      success: true,
      status: 200,
      message: "Property deleted successfully",
    });
  },
);

const rentalRequestsForLandLordsProperties = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const landLordId = req.user?.userId as string;
    if (!landLordId) {
      throw new AppError(
        "User Id not found..Please login first",
        httpStatus.UNAUTHORIZED,
      );
    }

    const result =
      await landLordService.rentalRequestsForLandLordsPropertiesFromDB(
        landLordId,
      );

    sendResponse(res, {
      success: true,
      status: 200,
      message: "Rental requests fetched successfully",
      data: result,
    });
  },
);

const approveOrRejectRentalRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rentalRequestId = req.params?.id as string;
    const payload = req.body.status as Status;
    const userId = req.user?.userId as string;


    if (!payload) {
      throw new AppError("Status is required..", httpStatus.BAD_REQUEST);
    }

    if (payload !== "APPROVED" && payload !== "REJECTED") {
      throw new AppError(
        "Invalid status value. Must be 'APPROVED' or 'REJECTED'.",
        httpStatus.BAD_REQUEST,
      );
    }

    // if(){
    //     throw new Error("Invalid status value. Must be 'APPROVED' or 'REJECTED'.");
    // }

    // try {
    //     payload=req.body as Status;
    // } catch (error) {
    //     throw new Error("Invalid status value. Must be 'APPROVED' or 'REJECTED'.");
    // }
    // console.log(payload);

    const result = await landLordService.approveOrRejectRentalRequestInDB(
      userId,
      rentalRequestId,
      payload,
    );

    // console.log("result:",result)

    sendResponse(res, {
      success: true,
      status: 200,
      message: "Rental request status updated successfully",
      data: result,
    });
  },
);

export const landLordController = {
  createProperty,
  updateProperty,
  deleteProperty,
  rentalRequestsForLandLordsProperties,
  approveOrRejectRentalRequest,
};
