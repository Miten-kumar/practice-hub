// src/middleware/metrics.middleware.ts

import { requestCounter, requestDuration } from "../config/metrics";

export const metricsMiddleware = (req: any, res: any, next: any) => {
  const start = Date.now();

  res.on("finish", () => {
    requestCounter.inc();

    const duration = (Date.now() - start) / 1000;
    requestDuration.observe(duration);
  });

  next();
};