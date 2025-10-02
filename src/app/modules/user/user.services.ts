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

  const puzzleAttempts = await PuzzleAttempt.find({ userId: userId }).lean();

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
