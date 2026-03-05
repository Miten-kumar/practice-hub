import { Response } from "express";

export const responseFormatter = (
  res: Response,
  data: unknown,
  message = "success",
  statusCode = 200,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
