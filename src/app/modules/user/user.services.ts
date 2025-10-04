import APIError from "@/error/APIError";
import { User } from "./user.model";
import httpStatus from "http-status";
import { PuzzleAttempt } from "../game/game.model";

const getProgress = async (userId: string) => {
  // Fetch user progress from the database
  const user = await User.findById(userId).lean();
  if (!user) {
    throw new APIError("User not found", httpStatus.NOT_FOUND);
  }

  let puzzleAttempts: any = await PuzzleAttempt.find({ userId: userId }).populate('puzzleId').lean();

  // Organize attempts data
  puzzleAttempts = puzzleAttempts.map((attempt: any) => ({
    puzzleId: attempt.puzzleId._id, 
    puzzle: attempt.puzzleId, 
    attemptAt: attempt.attemptAt,
    status: attempt.status,
  }));

  const progressData = {
    solved: user.solvedPuzzles,
    attempts: user.attempts,
    puzzles: puzzleAttempts,
  };

  return progressData;
};

export const UserService = {
  getProgress,
};
