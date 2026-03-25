import express, { type Request, type Response } from "express";
import { emailRoute } from "./routes/email.js";
import { imageRoute } from "./routes/image.js";

export const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "hello" });
});

app.use("/email", emailRoute);
app.use("/image", imageRoute);
