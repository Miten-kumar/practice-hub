import express, { Request, Response } from "express";
import { login } from "./controller/login";
const app = express();

const PORT = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Manush Patel this side");
});

app.get("/login", login);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
