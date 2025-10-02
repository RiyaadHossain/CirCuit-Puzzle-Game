import catchAsync from "@/shared/catch-async";
import sendResponse from "@/shared/send-response";
import httpStatus from "http-status";
import { UserService } from "./user.services";

const getProgress = catchAsync(async (req, res) => {
    const userId = req?.user?.userId;
  const result = await UserService.getProgress(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User progress fetched successfully",
    data: result,
  });
});

export const UserControllers = {
  getProgress,
};
