import { Request, Response } from "express";
import { AuthService } from "../services/user.service";

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const authService = new AuthService();
      const result = await authService.registerUser(req.body);
      res
        .status(201)
        .json({ message: "User registered successfully", data: result });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const authService = new AuthService();
            const result = await authService.loginUser(email, password);
            res.status(200).json({ message: "Login successful", data: result });
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    }
}
