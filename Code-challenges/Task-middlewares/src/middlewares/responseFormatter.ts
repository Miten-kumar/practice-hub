import { Request, Response, NextFunction } from "express";

export const responseFormatter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const oldJson = res.json;

  res.json = function (data: any) {
    const formattedResponse = {
      success: res.statusCode < 400,
      data,
    };

    return oldJson.call(this, formattedResponse);
  };

  next();
};