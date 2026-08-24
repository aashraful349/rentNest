import { NextFunction, Request, RequestHandler, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import sendResponse from "../../utility/sendResponse";
import { authService } from "./auth.service";
import httpStatus from "http-status";
import { auth } from "../../middleware/auth";

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await authService.registerUserDB(payload);
    // console.log("result",result)

    sendResponse(res, {
      success: true,
      status: httpStatus.OK,
      message: "User registered successfully",
      data: result,
    });
  },
);

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    // console.log("email,password",email,password)
    const { accessToken, refreshToken } =
      await authService.loginUserFromDB(payload);
    // console.log("accessToken:", accessToken);
    // console.log("refreshToken:", refreshToken);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    sendResponse(res, {
      success: true,
      status: httpStatus.OK,
      message: "User logged in successfully",
      data: {
        accessToken,
        refreshToken,
      },
    });
  },
);

const getMe=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const userId=req.user?.userId as string;
    const result=await authService.getMeFromDB(userId)
    sendResponse(res,{
        success:true,
        status:httpStatus.OK,
        message:"Current user fetched successfully",
        data:result
    })

})

export const authController = {
  registerUser,
  loginUser,
  getMe
};
