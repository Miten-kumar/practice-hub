import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

const service = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await service.register(email, password);

    res.json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await service.login(email, password);

    res.json({ token });
  }
}
