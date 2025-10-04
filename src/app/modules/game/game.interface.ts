import {
  ATTEMPT_STATUS,
  COMPONENT_TYPE,
  PUZZLE_DIFFICULTY,
} from "@/enums/game.enums";
import { Types } from "mongoose";

export interface IComponent {
  type: COMPONENT_TYPE;
  id: string;
  minCount: number;
  maxCount: number;
  properties: Record<string, any>; // dynamic depending on component type
}

export interface IRules {
  resistorValue?: number;
  maxComponents?: number;
}

export interface IPuzzle {
  _id?: string;
  puzzleId: string;
  title: string;
  description: string;
  difficulty: PUZZLE_DIFFICULTY;
  components: IComponent[]; // Array of component objects
  rules: IRules;
  hints: string[]; // General hints for the puzzle
  userGuide: string[]; // Instructions or guide for users
}

export interface IPuzzleAttempt {
  _id?: string;
  userId: Types.ObjectId;
  puzzleId: Types.ObjectId;
  attemptAt?: Date;
  status?: ATTEMPT_STATUS;
}

export interface IPuzzleHint {
  userId: Types.ObjectId;    
  puzzleId: Types.ObjectId;  
  hint: string;       // generated hint text
}

export interface CircuitSubmission {
  puzzleId: string;
  components: any[];
  connections: { from: string; to: string }[];
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}