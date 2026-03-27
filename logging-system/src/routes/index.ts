// src/routes/index.ts

import { Router } from "express";
import { logger } from "../config/logger";

const router = Router();

router.get("/", (req: any, res) => {
  logger.info("Home route hit", {
    requestId: req.requestId,
  });

  res.send("Hello World");
});

router.get("/error", (req, res) => {
  throw new Error("Test error");
});

export default router;