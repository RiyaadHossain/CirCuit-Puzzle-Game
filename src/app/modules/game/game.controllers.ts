import catchAsync from "@/shared/catch-async";
import sendResponse from "@/shared/send-response";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { GameService } from "./game.services";
import APIError from "@/error/APIError";

const getAllPuzzles = catchAsync(async (req: Request, res: Response) => {
  const puzzles = await GameService.getAllPuzzles();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Puzzles retrieved successfully",
    data: puzzles,
  });
});

const submitPuzzle = catchAsync(async (req: Request, res: Response) => {
  const { puzzleId } = req.body;

  // @ts-ignore
  if (!req.file) throw new APIError("No file uploaded", httpStatus.BAD_REQUEST);

  // @ts-ignore
  const filePath = req.file.path;
  const userId = req.user?.userId;
  const result = await GameService.submitPuzzle(userId, puzzleId, filePath);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: result.success,
    message: result.message,
    data: result,
  });
});

const getHint = catchAsync(async (req: Request, res: Response) => {
  const { puzzleId } = req.body;
  const userId = req.user?.userId;
  if (!req.file) throw new APIError("No file uploaded", httpStatus.BAD_REQUEST);

  const filePath = req.file.path;

  const result = await GameService.getHint(userId, puzzleId, filePath);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Hint retrieved successfully", 
    data: result,
  });
});

export const GameControllers = {
  getAllPuzzles,
  submitPuzzle,
  getHint,
};
