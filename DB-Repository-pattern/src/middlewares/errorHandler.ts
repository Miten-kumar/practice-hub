import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, "Route not found", "ROUTE_NOT_FOUND"));
};

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const code = err instanceof ApiError ? err.code : "INTERNAL_SERVER_ERROR";
  const details = err instanceof ApiError ? err.details : undefined;

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message: err.message || "Internal server error",
      details,
    },
    meta: {
      statusCode,
      method: req.method,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
    },
  });
};
