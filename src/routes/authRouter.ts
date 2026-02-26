import express, { Request, Response } from "express";
const authRoutes = express.Router();

authRoutes.post("/login", (req: Request, res: Response) => {
  res.send("Login route");
});

authRoutes.post("/register", (req: Request, res: Response) => {
  res.send("Register route");
});

export default authRoutes;
