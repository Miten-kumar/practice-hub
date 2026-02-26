import { Request, Response } from "express";

export interface Movie {
  id: number;
  title: string;
  director: string;
  releaseYear: number;
}

const movies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    releaseYear: 2010,
  },
  {
    id: 2,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    releaseYear: 1999,
  },
  {
    id: 3,
    title: "Interstellar",
    director: "Christopher Nolan",
    releaseYear: 2014,
  },
];
export const getMovies = (req: Request, res: Response<Movie[]>) => {
  res.json(movies);
};
