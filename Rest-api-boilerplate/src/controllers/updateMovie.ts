import { Request, Response } from "express";

export const updateMovie = (req: Request, res: Response) => {
  throw new Error("Update Movie Error");
  res.send("Update Movie");
};
