import express, { Request, Response, NextFunction } from "express";

interface Error {
  status: number;
  message: string;
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(500).json({ message: "Internal server error" });
};
