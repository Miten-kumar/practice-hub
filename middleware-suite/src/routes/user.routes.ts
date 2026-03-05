import { createUser } from "../controllers/users.controller";
import express from "express";
import { validateRequestBody } from "../middlewares/validation";
import { createUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/", validateRequestBody(createUserSchema), createUser);

export default router;
