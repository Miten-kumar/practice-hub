import express, { NextFunction, Request, Response } from "express";

export interface authParams {
  username: string;
  password: string;
}

const requreAuth = (
  req: Request<authParams>,
  res: Response,
  next: NextFunction,
) => {
  const username: string = "manush";
  const password: string = "password123";

  const uname: string = req.query.uname as string;
  const pass: string = req.query.pass as string;

  console.log(`Received credentials - Username: ${uname}, Password: ${pass}`);

  if (uname === username && pass === password) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

export default requreAuth;
