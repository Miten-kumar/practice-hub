import type { NextFunction, Request, Response } from "express";
import logger from "../logger/logger.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error("Unhandled Error", {
    meta: {
      correlationId: req.headers["x-correlation-id"],
      path: req.originalUrl,
      method: req.method,
      stack: err.stack,
    },
  });

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    correlationId: req.headers["x-correlation-id"],
  });
};
