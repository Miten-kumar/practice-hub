// routes/userRoutes.ts

import express from "express";
import {
  getUsers,
  getUser,
  getUserPosts,
  createUser,
  login
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/login", login);

router.get("/users", authMiddleware, getUsers);
router.get("/users/:id", authMiddleware, getUser);
router.get("/users/:id/posts", authMiddleware, getUserPosts);

router.post("/users", createUser);

export default router;