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
    statusCode: httpStatus.CREATED,
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

const getRefreshToken = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string
  const result = await AuthService.getRefreshToken(refreshToken);

  // Set Cookie
  const cookieOptions = {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: result,
  });
});

const logout = catchAsync(async (_req, _res) => {});

export const AuthControllers = {
  register,
  login,
  getRefreshToken,
  logout,
};
