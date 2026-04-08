import express from "express";
import { handler } from "./handler";
import { UserController } from "../controllers/UserController";

const router = express.Router();

router.post("/users", handler(UserController, "createUser"));

export default router;