import express, { Request, Response } from "express";
import {
  createUserController,
  updateUserController,
} from "../controllers/user.controller";
import { errorHandler } from "../middlewares/errorHandler";
import { up } from "../../migrations/1771842548955_create-tables";

const userRouter = express.Router();

userRouter.post("/", createUserController);

userRouter.put("/:id", updateUserController);

userRouter.use(errorHandler);

export default userRouter;
