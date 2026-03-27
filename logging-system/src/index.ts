import express from "express";
import * as Sentry from "@sentry/node";

import routes from "./routes";
import { correlationMiddleware } from "./middlewares/correlation.middleware";
import { requestLogger } from "./middlewares/logger.middleware";
import { metricsMiddleware } from "./middlewares/metrics.middleware";
import { register } from "./config/metrics";
import { logger } from "./config/logger";

const app = express();

Sentry.init({
  dsn: "https://add06f6fd4ac5bb25515ff5cb2bd2579@o4511053440221184.ingest.us.sentry.io/4511053444218880",
  tracesSampleRate: 1.0,
});

app.use(express.json());

app.use(correlationMiddleware);
app.use(metricsMiddleware);
app.use(requestLogger);
// ✅ Put this BEFORE app.use("/", routes)

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.use("/", routes);

// Test error route
app.get("/error", (req, res) => {
  throw new Error("Test error");
});

app.use((err: any, req: any, res: any, next: any) => {
  // ✅ Log error
  logger.error("Unhandled error", {
    requestId: req.requestId,
    message: err.message,
    stack: err.stack,
  });

  // ✅ Send to Sentry
  Sentry.captureException(err);

  // ✅ ALERT (your task requirement)
  console.error("🚨 ALERT: Critical error occurred!", {
    requestId: req.requestId,
  });

  res.status(500).json({
    message: "Internal Server Error",
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});