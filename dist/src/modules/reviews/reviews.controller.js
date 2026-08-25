import { catchAsync } from "../../utility/catchAsync";
import { reviewService } from "./reviews.service";
import sendResponse from "../../utility/sendResponse";
const createReview = catchAsync(async (req, res, next) => {
    const payload = req.body;
    // console.log("payload:",payload)
    const userId = req.user?.userId;
    console.log("userId:", userId);
    const result = await reviewService.createReview(payload, userId);
    // console.log("result:", result);
    sendResponse(res, {
        success: true,
        status: 200,
        message: "Review created successfully",
        data: result,
    });
});
const getReviewsByPropertyId = catchAsync(async (req, res, next) => {
    const propertyId = req.params?.propertyId;
    const result = await reviewService.getAllReviewsByPropertyId(propertyId);
    sendResponse(res, {
        success: true,
        status: 200,
        message: "Reviews fetched successfully",
        data: result
    });
});
export const reviewController = {
    createReview,
    getReviewsByPropertyId
};
//# sourceMappingURL=reviews.controller.js.map