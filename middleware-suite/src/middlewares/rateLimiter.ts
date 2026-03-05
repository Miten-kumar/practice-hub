import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { redisClient } from "../config/redis";

export const apiLimiter = () => {
  return rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    store: new RedisStore({
      sendCommand: (...args: string[]) => redisClient.sendCommand(args),
    }),
  });
};
