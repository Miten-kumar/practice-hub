// src/config/logger.ts

import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const fileTransport = new DailyRotateFile({
  filename: "logs/app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "7d",
  zippedArchive: true,
});

const errorTransport = new DailyRotateFile({
  filename: "logs/error-%DATE%.log",
  level: "error",
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),

  transports: [
    new winston.transports.Console(), // important for docker
    fileTransport,
    errorTransport,
  ],
});