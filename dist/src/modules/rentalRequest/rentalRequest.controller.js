import { catchAsync } from "../../utility/catchAsync";
import { rentalRequestService } from "./rentalRequest.service";
import sendResponse from "../../utility/sendResponse";
import { AppError } from "../../utility/AppError";
import httpStatus from "http-status";
const createRentalRequest = catchAsync(async (req, res, next) => {
    const tenantId = req.user?.userId;
    if (!tenantId) {
        throw new AppError("Tenant Id not found", httpStatus.NOT_FOUND);
    }
    const payload = req.body;
    const result = await rentalRequestService.createRentalRequestInDB(tenantId, payload);
    // console.log("result:",result)
    sendResponse(res, {
        success: true,
        status: 200,
        message: "Rental request created successfully",
        data: result,
    });
});
const getAllRentalRequests = catchAsync(async (req, res, next) => {
    const userId = req.user?.userId;
    if (!userId) {
        throw new AppError("User Id not found..Please login first", httpStatus.UNAUTHORIZED);
    }
    const result = await rentalRequestService.getAllRentalRequestsFromDB(userId);
    // console.log("result:",result)
    sendResponse(res, {
        success: true,
        status: 200,
        message: "Rental requests fetched successfully",
        data: result,
    });
});
const getRentalRequestById = catchAsync(async (req, res, next) => {
    const id = req.params?.id;
    const userId = req.user?.userId;
    if (!userId) {
        throw new AppError("User Id not found..Please login first", httpStatus.UNAUTHORIZED);
    }
    const result = await rentalRequestService.getRentalRequestByIdFromDB(userId, id);
    // console.log("result:",result)
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
//# sourceMappingURL=rentalRequest.controller.js.map