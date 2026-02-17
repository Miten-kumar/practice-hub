import { Request, Response } from "express";
import { Movie } from "./getMovies";

export const postMovie = (req: Request<Movie>, res: Response<Movie>) => {
  res.json(req.body);
};
