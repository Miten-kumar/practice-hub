import express, { NextFunction, Request, Response } from "express";

export interface errorSchema {
  message: string;
  statusCode: number;
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(`Error: ${err.message} at ${new Date().toISOString()}`);
  res.status(500).send({
    message: err.message || "Something went wrong!",
    statusCode: 500,
  } as errorSchema);
  next();
};
