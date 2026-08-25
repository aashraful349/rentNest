import { catchAsync } from "../../utility/catchAsync";
import { landLordService } from "./landLord.service";
import sendResponse from "../../utility/sendResponse";
import { AppError } from "../../utility/AppError";
import httpStatus from "http-status";
const createProperty = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const userId = req.user?.userId;
    const result = await landLordService.createPropertyIntoDB(payload, userId);
    // console.log("result:",result)
    sendResponse(res, {
        success: true,
        status: 200,
        message: "Property created successfully",
        data: result
    });
});
const updateProperty = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const id = req.params?.id;
    const result = await landLordService.updatePropertyInDB(req, id, payload);
    sendResponse(res, {
        success: true,
        status: 200,
        message: "Property updated successfully",
        data: result
    });
});
const deleteProperty = catchAsync(async (req, res, next) => {
    const userId = req.user?.userId;
    const id = req.params?.id;
    await landLordService.deletePropertyFromDB(userId, id);
    sendResponse(res, {
        success: true,
        status: 200,
        message: "Property deleted successfully",
    });
});
const rentalRequestsForLandLordsProperties = catchAsync(async (req, res, next) => {
    const landLordId = req.user?.userId;
    const result = await landLordService.rentalRequestsForLandLordsPropertiesFromDB(landLordId);
    sendResponse(res, {
        success: true,
        status: 200,
        message: "Rental requests fetched successfully",
        data: result
    });
});
const approveOrRejectRentalRequest = catchAsync(async (req, res, next) => {
    const rentalRequestId = req.params?.id;
    const payload = req.body.status;
    const userId = req.user?.userId;
    if (payload !== "APPROVED" && payload !== "REJECTED") {
        throw new AppError("Invalid status value. Must be 'APPROVED' or 'REJECTED'.", httpStatus.BAD_REQUEST);
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
    const result = await landLordService.approveOrRejectRentalRequestInDB(userId, rentalRequestId, payload);
    // console.log("result:",result)
    sendResponse(res, {
        success: true,
        status: 200,
        message: "Rental request status updated successfully",
        data: result
    });
});
export const landLordController = {
    createProperty,
    updateProperty,
    deleteProperty,
    rentalRequestsForLandLordsProperties,
    approveOrRejectRentalRequest
};
//# sourceMappingURL=landLord.controller.js.map