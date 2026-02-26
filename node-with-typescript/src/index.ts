import express, { NextFunction, Request, Response } from "express";
import errorHandler from "./middlewares/errorhandler";
import requreAuth, { authParams } from "./middlewares/authMiddleware";
const app = express();

app.get("/login", requreAuth, (req: Request<authParams>, res: Response) => {
  res.send("Welcome to the home page!");
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
