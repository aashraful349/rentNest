import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utility/catchAsync";
import { rentalRequestService } from "./rentalRequest.service";
import sendResponse from "../utility/sendResponse";

const createRentalRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tenantId = req.user?.userId as string;
    if (!tenantId) {
      throw new Error("Tenant Id not found");
    }
    const payload = req.body;
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
    const result=await rentalRequestService.getAllRentalRequestsFromDB();

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
    const id=req.params?.id as string;
    const result=await rentalRequestService.getRentalRequestByIdFromDB(id);

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
  getAllRentalRequests  ,
    getRentalRequestById
};
