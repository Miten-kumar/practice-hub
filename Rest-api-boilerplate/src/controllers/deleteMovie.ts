import { Request, Response } from "express";

export const deleteMovie = (req: Request, res: Response) => {
  res.send("Delete Movie");
};
