import express, { type Request, type Response } from "express";
import logger from "../logger/logger.js";

export const userRoute = express.Router();

userRoute.get("/", (req: Request, res: Response) => {
  logger.info("user fetch", {
    id: 123,
    email: "manush@gmail.com",
    password: "123@abc",
  });
  //   throw new Error("server error");
  res.status(200).json({ success: true, user: { id: 123, name: "Manush" } });
});
