import { Request, Response, NextFunction } from "express";
import z, { ZodSchema } from "zod";
import { BadRequestError } from "../utils/errors";

export const validateRequest =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new BadRequestError(result.error.message);
    }

    req.body = result.data;
    next();
  };
