import httpStatus from "http-status";
import { catchAsync } from "../../utility/catchAsync";
import sendResponse from "../../utility/sendResponse";
import { reviewService } from "./reviews.service";
const createReview = catchAsync(async (req, res, next) => {
    const tenantId = req.user?.userId;
    if (!tenantId) {
        throw new Error("Tenant ID not found");
    }
    const result = await reviewService.createReview(tenantId, req.body);
    sendResponse(res, {
        success: true,
        status: httpStatus.CREATED,
        message: "Review created successfully",
        data: result,
    });
});
export const reviewController = {
    createReview,
};
//# sourceMappingURL=reviews.controller.js.map