import catchAsync from "@/shared/catch-async";
import sendResponse from "@/shared/send-response";
import httpStatus from "http-status";
import { AuthService } from "./auth.services";
import config from "@/config";

const register = catchAsync(async (req, res) => {
  const registerData = req.body;
  const result = await AuthService.register(registerData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const loginData = req.body;
  const result = await AuthService.login(loginData);

  // Set Cookie
  const cookieOptions = {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  };

  const { refreshToken } = result;
  res.cookie("refreshToken", refreshToken, cookieOptions);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  console.log("Cookies", req.cookies) // ! for debugging

  const accessToken = req.headers.cookie?.split("=")[1] as string
  const result = await AuthService.refreshToken(accessToken);

  // Set Cookie
  const cookieOptions = {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", accessToken, cookieOptions);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: result,
  });
});

const logout = catchAsync(async (_req, res) => {});

export const AuthControllers = {
  register,
  login,
  refreshToken,
  logout,
};
