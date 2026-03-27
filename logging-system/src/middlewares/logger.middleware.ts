// src/middleware/logger.middleware.ts

import { logger } from "../config/logger";
import { redact } from "../utils/redact";
import * as Sentry from "@sentry/node";

export const requestLogger = (req: any, res: any, next: any) => {
  const start = Date.now();

  // ✅ Add Sentry context here
  Sentry.setContext("request", {
    requestId: req.requestId,
    route: req.url,
    method: req.method,
  });

  logger.info("Incoming request", {
    requestId: req.requestId,
    method: req.method,
    url: req.url,
    body: redact(req.body),
  });

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info("Request completed", {
      requestId: req.requestId,
      statusCode: res.statusCode,
      duration,
    });

    // ✅ Slow request alert
    if (duration > 1000) {
      logger.warn("Slow request detected", {
        requestId: req.requestId,
        duration,
      });
    }
  });

  next();
};
