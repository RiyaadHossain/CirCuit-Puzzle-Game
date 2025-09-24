import httpStatus from "http-status";

class APIError extends Error {
  public statusCode: number;
  public errors?: any;

  constructor(
    message: string,
    statusCode: number = httpStatus.INTERNAL_SERVER_ERROR,
    errors?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default APIError;
