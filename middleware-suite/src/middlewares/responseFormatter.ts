import { Response, Request, NextFunction } from "express";

export const responseFormatter = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.success = function (data: any, message = "success") {
    return res.json({
      success: true,
      message,
      data,
    });
  };

  res.error = function (
    message: string,
    statusCode: number = 500,
    errors: object={},
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  };

  next();
};
