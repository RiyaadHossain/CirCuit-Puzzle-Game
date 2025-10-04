import {
  CircuitSubmission,
  IPuzzle,
  IPuzzleHint,
  ValidationResult,
} from "./game.interface";
import { Puzzle, PuzzleHint } from "./game.model";
import { validateComponentCounts } from "./game.validations/component.validation";
import { puzzleSpecificRules } from "./game.validations/custom.validation";
import {
  buildGraph,
  universalElectricalChecks,
} from "./game.validations/graph.validation";
import { GoogleGenAI } from "@google/genai";
import config from "@/config";
import mongoose, { Types } from "mongoose";

export async function validateCircuitHelper(
  submission: CircuitSubmission
): Promise<ValidationResult> {
  const puzzle = await Puzzle.findOne({ puzzleId: submission.puzzleId });
  if (!puzzle) return { valid: false, errors: ["Invalid puzzleId"] };

  const errors: string[] = [];

  // Step 1: Component counts
  validateComponentCounts(submission, puzzle, errors);

  // Step 2: Graph representation
  const graph = buildGraph(submission);

  // Step 3: Universal electrical checks
  universalElectricalChecks(submission, graph, errors);

  // Step 4: Puzzle-specific dynamic rules
  puzzleSpecificRules(submission, puzzle, errors); // Todo: fix mustHaveSeries validation logic properly

  return {
    valid: errors.length === 0,
    errors: errors,
  };
}

export async function getHints(
  submission: CircuitSubmission,
  puzzle: any,
  errors: string[]
): Promise<{ hint: string }> {
  const prompt = `Given this circuit JSON "${JSON.stringify(submission)}" and errors: "${errors.join(",")}". generate a helpful hint for fixing it without giving away the full solution. Just provide one hint in plain text and don't write anything else rather than the hint text.`;

  const ai = new GoogleGenAI({ apiKey: config.GOOGLE_GENAI_API_KEY });
  const geminiResponse = await ai.models.generateContent({
    model: config.GEMINI_MODEL,
    contents: prompt,
  });

  return { hint: geminiResponse.text || "No hint available" };
}

export async function canRequestHint(
  userId: string,
  puzzleId: string,
  maxHints = Number(config.MAX_HINTS ?? 3)
): Promise<boolean> {
  const count = await PuzzleHint.countDocuments({ userId, puzzleId }).exec();
  return count < maxHints;
}

export async function recordHintRequest(
  userId: Types.ObjectId,
  puzzleId: Types.ObjectId,
  hintText: string
) {
  // optional: validate that userId / puzzleId are valid ObjectId strings
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid userId");
  }
  if (!mongoose.Types.ObjectId.isValid(puzzleId)) {
    throw new Error("Invalid puzzleId");
  }

  const payload: Partial<IPuzzleHint> = {
    userId,
    puzzleId,
    hint: hintText,
  };

  const doc = await PuzzleHint.create(payload);
  return doc;
}
