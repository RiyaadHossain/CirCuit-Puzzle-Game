import path from "path";
import { Puzzle, PuzzleAttempt, Component, Rules } from "./game.model";
import fs from "fs";
import {
  canRequestHint,
  getHints,
  recordHintRequest,
  validateCircuitHelper,
} from "./game.helper";
import { User } from "../user/user.model";
import { Types } from "mongoose";
import { ATTEMPT_STATUS } from "@/enums/game.enums";

const getAllPuzzles = async () => {
  const puzzles = await Puzzle.find().populate("rules components");
  return puzzles;
};

const submitPuzzle = async (
  userId: string,
  puzzleId: string,
  filePath: string
) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // Read the uploaded JSON file
  const resolvedPath = path.resolve(filePath);
  const rawData = fs.readFileSync(resolvedPath, "utf-8");
  const submission = JSON.parse(rawData);

  // Detete Json file after reading
  fs.unlink(resolvedPath, (err) => {
    if (err) console.error("Error deleting file:", err);
  });

  // Fetch the puzzle details
  const puzzle = await Puzzle.findOne({ puzzleId })
    .populate("rules")
    .populate("components");
  if (!puzzle) throw new Error("Puzzle not found");

  const puzzleAttempt = await PuzzleAttempt.create({
    userId: user._id as Types.ObjectId,
    puzzleId: puzzle._id as Types.ObjectId,
  });

  // Increment total attempts for the user
  user.attempts += 1;
  await user.save();

  // Validate the submission
  const validationResult = await validateCircuitHelper(submission);
  if (!validationResult.valid)
    return {
      success: false,
      message: "Puzzle solve failed",
      errors: validationResult.errors,
    };

  // Mark the attempt as solved
  puzzleAttempt.status = ATTEMPT_STATUS.SOLVED;
  await puzzleAttempt.save();

  // Update user stats
  user.solvedPuzzles += 1;
  await user.save();

  return { success: true, message: "Puzzle solved successfully!" };
};

const getHint = async (userId: string, puzzleId: string, filePath: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const puzzle = await Puzzle.findOne({ puzzleId });
  if (!puzzle) throw new Error("Puzzle not found");

  const canRequest = await canRequestHint(userId, puzzle._id as string);
  if (!canRequest) throw new Error("Hint limit reached for this puzzle");

  // Read the uploaded JSON file
  const resolvedPath = path.resolve(filePath);
  const rawData = fs.readFileSync(resolvedPath, "utf-8");
  const submission = JSON.parse(rawData);

  // Validate the submission
  const validationResult = await validateCircuitHelper(submission);

  if (validationResult.valid)
    return { success: true, message: "Puzzle already solved!" };

  // Generate hint using LLM
  const errors = validationResult.errors || [];
  const llmHinsts = await getHints(submission, puzzle, errors);

  const user_id = user._id as Types.ObjectId;
  const puzzle_id = puzzle._id as Types.ObjectId;
  await recordHintRequest(user_id, puzzle_id, llmHinsts.hint);

  return { hint: llmHinsts.hint };
};

/**
 * Adds a new puzzle to the database.
 * @param puzzleData - Object containing puzzle fields as per puzzleSchema.
 *   {
 *     puzzleId: string,
 *     title: string,
 *     description: string,
 *     components: Array<{ id, type, minCount, maxCount, properties }>,
 *     difficulty?: string,
 *     rules?: { resistorValue?: number, maxComponents?: number },
 *     hints?: string[],
 *     userGuide?: string[]
 *   }
 */
const addPuzzle = async (puzzleData: any) => {
  // Create components if provided as objects
  let componentIds = [];
  if (Array.isArray(puzzleData.components)) {
    const createdComponents = await Promise.all(
      puzzleData.components.map(async (comp: any) => {
        // Check if component with same id exists
        let existing = await Component.findOne({ id: comp.id });
        if (existing) return existing._id;
        const created = await Component.create(comp);
        return created._id;
      })
    );
    componentIds = createdComponents;
  }

  // Create rules if provided
  let rulesId = undefined;
  if (puzzleData.rules) {
    const createdRules = await Rules.create(puzzleData.rules);
    rulesId = createdRules._id;
  }

  // Create the puzzle
  const puzzle = await Puzzle.create({
    puzzleId: puzzleData.puzzleId,
    title: puzzleData.title,
    description: puzzleData.description,
    components: componentIds,
    difficulty: puzzleData.difficulty,
    rules: rulesId,
    hints: puzzleData.hints,
    userGuide: puzzleData.userGuide,
  });

  return puzzle;
};

export const GameService = {
  getAllPuzzles,
  submitPuzzle,
  getHint,
  addPuzzle, 
};
