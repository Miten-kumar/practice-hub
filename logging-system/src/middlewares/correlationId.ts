import type { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";

export const correlationIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const correlationId = v4();

  req.headers["x-correlation-id"] = correlationId;

  next();
};
