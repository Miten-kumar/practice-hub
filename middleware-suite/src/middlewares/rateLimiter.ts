import type { Request, Response, NextFunction } from "express";
import { redisClient } from "../config/redis";

const WINDOW_SIZE = 60;
const MAX_REQUEST = 100;

export const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ip = req.ip || "unknown";
    const key = `rate_limit:${ip}`;

    const requests = await redisClient.incr(key);

    if (requests === 1) {
      await redisClient.expire(key, WINDOW_SIZE);
    }

    if (requests > MAX_REQUEST) {
      return res.status(429).json({
        success: false,
        message: "Too many requests",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    next(); // do not block request if redis fails
  }
};
