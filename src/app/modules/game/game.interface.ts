import { ATTEMPT_STATUS, COMPONENT_TYPE, PUZZLE_DIFFICULTY } from "@/enums/game.enums";
import { Types } from "mongoose";

export interface IComponent {
  _id?: string;
  type: COMPONENT_TYPE;
  properties: Record<string, any>; // dynamic depending on component type
}

export interface IPuzzle {
  _id?: string;
  title: string;
  description: string;
  components: IComponent[]; // Array of component objects
  rules: string[]; // Specific validation rules (optional)
  difficulty: PUZZLE_DIFFICULTY;
}

export interface IPuzzleAttempt {
  _id?: string;
  userId: Types.ObjectId;
  puzzleId: Types.ObjectId;
  attemptAt?: Date;
  status?: ATTEMPT_STATUS;
}
