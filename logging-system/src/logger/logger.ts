import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
const { combine, timestamp, json, errors } = winston.format;

const maskdata = winston.format((info) => {
  if (info.password) {
    info.password = "[masked-password]";
  }
  if (info.email) {
    info.email = "[masked-emailId]";
  }

  return info;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(errors({ stack: true }), maskdata(), timestamp(), json()),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "15d",
      maxSize: "10m",
    }),
    new DailyRotateFile({
      filename: "logs/error-app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "20d",
      maxSize: "10m",
      level: "error",
    }),
  ],
});

export default logger;
