import { Schema, model, Document } from "mongoose";
import { IUser } from "./user.interface";

export interface IUserDocument extends Omit<IUser, "_id">, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    solvedPuzzles: { type: Number, default: 0 },
    attempts: { type: Number, default: 0 },
  },
  { timestamps: true } // auto create createdAt & updatedAt
);

export const User = model<IUserDocument>("User", userSchema);
