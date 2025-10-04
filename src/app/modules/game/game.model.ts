import { Schema, model, Document } from "mongoose";
import {
  IComponent,
  IPuzzle,
  IPuzzleAttempt,
  IPuzzleHint,
  IRules,
} from "./game.interface";
import {
  COMPONENT_TYPE,
  PUZZLE_DIFFICULTY,
  ATTEMPT_STATUS,
} from "@/enums/game.enums";

// . _____________________________ Component Schema and Model _____________________________
const componentSchema = new Schema<IComponent>(
  {
    id: { type: String, required: true, unique: true },
    type: {
      type: String,
      required: true,
      enum: Object.values(COMPONENT_TYPE),
    },
    minCount: { type: Number, default: 1 },
    maxCount: { type: Number, default: 1 },
    properties: { type: Object, required: true }, // Dynamic properties based on component type
  },
  { timestamps: true }
);
export const Component = model<IComponent>("Component", componentSchema);

// . _____________________________ Rules Schema and Model _____________________________
export interface IRulesDocument extends Omit<IRules, "_id">, Document {}
const rulesSchema = new Schema<IRulesDocument>(
  {
    mustHaveSeries: [
      [String], // array of components that must appear in series order | e.g. ["battery", "resistor", "led"]
    ],
    mustHaveParallel: [
      [String], // array of components that must be parallel | e.g. ["led1", "led2"]
    ],
    resistorValue: { type: Number }, // e.g. must be 220 ohm
    maxComponents: { type: Number, default: 8 },
  },
  { timestamps: true }
);
export const Rules = model<IRulesDocument>("Rules", rulesSchema);

// . _____________________________ Puzzle Schema and Model _____________________________
export interface IPuzzleDocument extends Omit<IPuzzle, "_id">, Document {}
const puzzleSchema = new Schema<IPuzzleDocument>(
  {
    puzzleId: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    components: [{ type: Schema.Types.ObjectId, ref: "Component" }], // Which components must be used
    difficulty: {
      type: String,
      enum: Object.values(PUZZLE_DIFFICULTY),
      default: PUZZLE_DIFFICULTY.EASY,
    },
    // Specific rules for each puzzle
    rules: { type: Schema.Types.ObjectId, ref: "Rules" },
    // Hints (General hints for the puzzle)
    hints: [{ type: String }],
    userGuide: [{ type: String }], // Instructions or guide for users
  },
  { timestamps: true }
);
export const Puzzle = model<IPuzzleDocument>("Puzzle", puzzleSchema);

// . _____________________________ PuzzleAttempt Schema and Model _____________________________
export interface IPuzzleAttemptDocument
  extends Omit<IPuzzleAttempt, "_id">,
    Document {}

const puzzleAttemptSchema = new Schema<IPuzzleAttemptDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    puzzleId: { type: Schema.Types.ObjectId, ref: "Puzzle", required: true },
    attemptAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: Object.values(ATTEMPT_STATUS),
      default: ATTEMPT_STATUS.ATTEMPTED,
    },
  },
  { timestamps: true }
);

export const PuzzleAttempt = model<IPuzzleAttemptDocument>(
  "PuzzleAttempt",
  puzzleAttemptSchema
);

// . _____________________________ PuzzleHint Shcema and Model _____________________________
export interface IPuzzleHintDocument extends IPuzzleHint, Document {}

const puzzleHintSchema = new Schema<IPuzzleHintDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    puzzleId: { type: Schema.Types.ObjectId, ref: "Puzzle", required: true },
    hint: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // createdAt will be set
  }
);

// Compound index to speed up count queries per user+puzzle
puzzleHintSchema.index({ userId: 1, puzzleId: 1 });

// OPTIONAL: when need daily reset (auto-delete hint records after 24h),
// uncomment the next line to make hints expire 86400 seconds after creation.
// puzzleHintSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

export const PuzzleHint = model<IPuzzleHintDocument>(
  "PuzzleHint",
  puzzleHintSchema
);
