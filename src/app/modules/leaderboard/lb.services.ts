import { User } from "../user/user.model";
import { PuzzleAttempt } from "../game/game.model";

import httpStatus from "http-status";
import APIError from "@/error/APIError";

const getLeaderboard = async (userId: string, limit: number = 10) => {
  // Fetch top users by solvedPuzzles
  const topUsers = await User.find({})
    .sort({ solvedPuzzles: -1 })
    .limit(limit)
    .select("username solvedPuzzles")
    .lean();

  // Find the rank of the requested user
  const allUsers = await User.find({})
    .sort({ solvedPuzzles: -1 })
    .select("_id")
    .lean();

  const userRank = allUsers.findIndex((u) => u._id.toString() === userId) + 1;

  let leaderboard = topUsers.map((u, idx) => ({
    username: u.username,
    solved: u.solvedPuzzles,
    rank: idx + 1,
  }));

  // If user is not in top N, add user info at the end
  if (userRank > limit) {
    const user = await User.findById(userId)
      .select("username solvedPuzzles")
      .lean();

    if (user)
      leaderboard = [
        ...leaderboard.slice(0, limit - 1),
        {
          username: user.username,
          solved: user.solvedPuzzles,
          rank: userRank,
        },
      ];
  }

  return leaderboard;
};

const getUserProgress = async (userId: string) => {
  const user = await User.findById(userId).lean();
  if (!user) throw new APIError("User not found", httpStatus.NOT_FOUND);

  // Fetch all puzzle attempts for the user
  const attempts = await PuzzleAttempt.find({ userId })
    .populate("puzzleId")
    .select("puzzleId status")
    .lean();

  // Map to required format
  const puzzles = attempts.map((a) => ({
    id: (a.puzzleId as any).puzzleId.toString(),
    status: a.status?.toLowerCase(),
  }));

  return {
    solved: user.solvedPuzzles,
    attempts: user.attempts,
    puzzles,
  };
};

export const LeaderboardService = {
  getLeaderboard,
  getUserProgress,
};
