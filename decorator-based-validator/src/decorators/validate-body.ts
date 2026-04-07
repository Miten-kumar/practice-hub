import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";
import type { ValidatedRequest } from "../types/validated-request.js";

type ClassConstructor<T> = new () => T;

export function ValidateBody<T>(
  dtoClass: ClassConstructor<T>,
): MethodDecorator {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      const dto = plainToInstance(dtoClass, req.body);

      const errors = await validate(dto as object, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (errors.length > 0) {
        const messages = errors
          .map((err) => Object.values(err.constraints || {}))
          .flat();

        return res.status(400).json({
          message: "Validation failed",
          errors: messages,
        });
      }

      const validatedRequest = req as ValidatedRequest<T>;
      validatedRequest.validatedBody = dto;

      return originalMethod.call(this, validatedRequest, res, next);
    };

    return descriptor;
  };
}
