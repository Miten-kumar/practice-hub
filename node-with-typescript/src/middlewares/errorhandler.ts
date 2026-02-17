import express, { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //   console.error(err.stack);
  res.status(500).send("Something went wrong!");
  next();
};

export default errorHandler;
