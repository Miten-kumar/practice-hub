import type { NextFunction, Request, Response } from "express";
import { requestCounter, responseTimeHistogram } from "../utils/metrics.js";
import logger from "../logger/logger.js";

export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;

    requestCounter.inc({
      method: req.method,
      route: req.originalUrl,
      status: res.statusCode,
    });

    responseTimeHistogram.observe(
      { method: req.method, route: req.originalUrl },
      duration,
    );

    logger.info("Request completed", {
      meta: {
        correlationId: req.headers["x-correlation-id"],
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        duration,
      },
    });
  });

  next();
};
