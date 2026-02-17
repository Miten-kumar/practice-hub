import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "../middlewares/errorHandler";
import logger from "../middlewares/logger";
import { get } from "node:http";
import { getMovies } from "../controllers/getMovies";
import { postMovie } from "../controllers/postMovie";
import { deleteMovie } from "../controllers/deleteMovie";
import { updateMovie } from "../controllers/updateMovie";

const moviesRouter = express.Router();

moviesRouter.use(logger);
moviesRouter.get("/", getMovies);

moviesRouter.post("/", postMovie);

moviesRouter.delete("/:id", deleteMovie);

moviesRouter.put("/:id", updateMovie);

moviesRouter.use(errorHandler);
export default moviesRouter;
