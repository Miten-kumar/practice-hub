import express, { Request, Response } from "express";
const authRoutes = express.Router();

authRoutes.post("/login", (req: Request, res: Response) => {
  const username: string = "manushpatel";
  const password: string = "password123";

  if (req.body.username === username && req.body.password === password) {
    res.send("Login successful");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

authRoutes.post("/register", (req: Request, res: Response) => {
  const username: string = "manushpatel";
  const password: string = "password123";

  if (username && password) {
    res.send("Registration successful");
  } else {
    res.status(400).send("Username and password are required");
  }
});

export default authRoutes;
