import type { Response } from "express";
import { ValidateBody } from "../decorators/validate-body.js";
import { RegisterDto } from "../dtos/register.dto.js";
import type { ValidatedRequest } from "../types/validated-request.js";

class AuthController {
  @ValidateBody(RegisterDto)
  register(req: ValidatedRequest<RegisterDto>, res: Response): void {
    const { name, email } = req.validatedBody;

    res.status(201).json({
      message: "Registration successful",
      user: {
        name,
        email,
      },
    });
  }
}

export const authController = new AuthController();
