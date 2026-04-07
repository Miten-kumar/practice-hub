import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

export const authRoutes = Router();

authRoutes.post("/register", (req, res) => {
  authController.register(req as never, res);
});
