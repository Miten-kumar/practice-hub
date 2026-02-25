import express, { Request, Response } from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller";
import { errorHandler } from "../middlewares/errorHandler";

const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.use(errorHandler);

export { authRouter };
