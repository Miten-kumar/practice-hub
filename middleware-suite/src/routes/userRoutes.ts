import express from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { createUserSchema } from "../schemas/userSchema";
import { responseFormatter } from "../middlewares/responseFormatter";

const userRouter = express.Router();

userRouter.post("/", validateRequest(createUserSchema), async (req, res) => {
  const user = {
    id: 1,
    ...req.body,
  };

  return responseFormatter(res, user, "User created", 201);
});

export default userRouter;
