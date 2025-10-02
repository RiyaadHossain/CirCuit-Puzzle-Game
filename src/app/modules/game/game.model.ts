import { Schema, model, Document } from "mongoose";
import { IComponent, IPuzzle, IPuzzleAttempt } from "./game.interface";
import {
  COMPONENT_TYPE,
  PUZZLE_DIFFICULTY,
  ATTEMPT_STATUS,
} from "@/enums/game.enums";

// Component Schema and Model
export interface IComponentDocument extends Omit<IComponent, "_id">, Document {}
const componentSchema = new Schema<IComponentDocument>(
  {
    type: {
      type: String,
      required: true,
      enum: Object.values(COMPONENT_TYPE),
    },
    properties: { type: Object, required: true },
  },
  { timestamps: true }
);
export const Component = model<IComponentDocument>(
  "Component",
  componentSchema
);

// Puzzle Schema and Model
export interface IPuzzleDocument extends Omit<IPuzzle, "_id">, Document {}
const puzzleSchema = new Schema<IPuzzleDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    components: [{ type: Schema.Types.ObjectId, ref: "Component" }],
    rules: [{ type: String }],
    difficulty: {
      type: String,
      enum: Object.values(PUZZLE_DIFFICULTY),
      default: PUZZLE_DIFFICULTY.EASY,
    },
  },
  { timestamps: true }
);
export const Puzzle = model<IPuzzleDocument>("Puzzle", puzzleSchema);

// PuzzleAttempt Schema and Model
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
      default: ATTEMPT_STATUS.UNSOLVED,
    },
  },
  { timestamps: true }
);

export const PuzzleAttempt = model<IPuzzleAttemptDocument>(
  "PuzzleAttempt",
  puzzleAttemptSchema
);
