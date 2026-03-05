import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors/errors";

export const validateRequestBody = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { success, data, error } = schema.safeParse(req.body);
    if (success) {
      req.body = data;
    }
    if (error) {
      return res.error("validation",400,error?.flatten())
    }
    next();
  };
};

export const validateRequestQuery = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { success, data, error } = schema.safeParse(req.query);
    if (success) {
      req.query = data;
    }
    if (error) {
      return res.error("validation",400,error?.flatten())
    }
    next();
  };
};

export const validateRequestParams = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { success, data, error } = schema.safeParse(req.params);
    if (success) {
      req.params = data;
    }
    if (error) {
      return res.error("validation",400,error?.flatten())
    }
    next();
  };
};
