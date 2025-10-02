import type { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import dotenv from "@config/index.js";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { IGenericErrorMessage } from "@/interfaces/error";
import handleZodError from "@/error/handleZodError";
import { handleMongooseError } from "@/error/handleMongooseError";

interface AppError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const status = err.status || "error";
  let errorMessages: IGenericErrorMessage[] = [];

  // In production, hide details for non-operational errors
  let message =
    dotenv.NODE_ENV === "production" && !err.isOperational
      ? "Something went wrong"
      : err.message;

  console.error(err);
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }

  if (err instanceof mongoose.Error) {
    const simplifiedError = handleMongooseError(err);
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }

  res.status(statusCode).json({
    status,
    success: false,
    message,
    errorMessages,
  });
}
