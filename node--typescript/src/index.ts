// index.ts
import express from "express";
import { Request, Response, NextFunction } from "express";
import {
  globalErrorHandler,
  loggerMiddleware,
  middleware,
} from "./middlewares/middlewares";
import { z } from "zod";
import dotenv from "dotenv";
import { router as userRoutes } from "./Routes/userRoutes";
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(8080),
});

export const env = envSchema.parse(process.env);

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World!");
  console.log("Response sent");
});
app.get("/hehe", middleware);

app.use("/users", userRoutes);

app.use(globalErrorHandler);

app.listen(env.PORT, () => {
  console.log(`Example app listening on port ${env.PORT}`);
});
