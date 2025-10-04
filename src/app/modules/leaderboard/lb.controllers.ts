import catchAsync from "@/shared/catch-async";
import sendResponse from "@/shared/send-response";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { LeaderboardService } from "./lb.services";

const getLeaderboard = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const leaderboard = await LeaderboardService.getLeaderboard(userId);
    sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Leaderboard retrieved successfully",
    data: leaderboard,
  });
});

const getUserProgress = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const progress = await LeaderboardService.getUserProgress(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User progress retrieved successfully",
    data: progress,
  });
});


export const leaderboardController = {
  getLeaderboard,
  getUserProgress,
};