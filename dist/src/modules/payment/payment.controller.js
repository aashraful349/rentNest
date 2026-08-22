import { catchAsync } from "../../utility/catchAsync";
import { paymentService } from "./payment.service";
import sendResponse from "../../utility/sendResponse";
const createPaymentSession = catchAsync(async (req, res, next) => {
    const userId = req.user?.userId;
    const rentalRequestId = req.body?.rentalRequestId;
    const result = await paymentService.createPaymentSession(userId, rentalRequestId);
    sendResponse(res, {
        status: 200,
        success: true,
        message: "Payment session created successfully",
        data: result,
    });
});
const handleWebhook = catchAsync(async (req, res, next) => {
    let event = req.body;
    console.log("stripe request body:", event);
    console.log(req.headers, "stripe req headers");
    const signature = req.headers['stripe-signature'];
    await paymentService.handleWebhook(event, signature);
    sendResponse(res, {
        success: true,
        status: 200,
        message: "Webhook received successfully",
        data: null
    });
});
const getPaymentHistory = catchAsync(async (req, res, next) => {
    const id = req.user?.userId;
    const result = await paymentService.getPaymentHistoryFromDB(id);
    sendResponse(res, {
        success: true,
        status: 200,
        message: "Payment history fetched successfully",
        data: result
    });
});
const getPaymentDetailsById = catchAsync(async (req, res, next) => {
    const paymentID = req.params.id;
    const userId = req.user?.userId;
    const result = await paymentService.getPaymentDetailsByIdFromDB(userId, paymentID);
    // console.log(result)
    sendResponse(res, {
        success: true,
        status: 200,
        message: "Payment details fetched successfully",
        data: result
    });
});
export const paymentController = {
    createPaymentSession,
    handleWebhook,
    getPaymentHistory,
    getPaymentDetailsById
};
//# sourceMappingURL=payment.controller.js.map