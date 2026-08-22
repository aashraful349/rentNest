import { catchAsync } from "../../utility/catchAsync";
import sendResponse from "../../utility/sendResponse";
import { categoriesService } from "./categories.service";
const getAllCategories = catchAsync(async (req, res, next) => {
    const result = await categoriesService.getAllCategoriesFromDB();
    // console.log("result:",result)
    sendResponse(res, {
        success: true,
        status: 200,
        message: "Categories fetched successfully",
        data: result
    });
});
export const categoriesController = {
    getAllCategories
};
//# sourceMappingURL=categories.controller.js.map