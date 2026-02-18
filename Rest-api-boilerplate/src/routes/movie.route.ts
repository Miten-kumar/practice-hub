import express from "express";
import { getMovies } from "../controllers/getMovies";
import { postMovie } from "../controllers/postMovie";
import { deleteMovie } from "../controllers/deleteMovie";
import { updateMovie } from "../controllers/updateMovie";

const moviesRouter = express.Router();

moviesRouter.get("/", getMovies);

moviesRouter.post("/", postMovie);

moviesRouter.delete("/:id", deleteMovie);

moviesRouter.put("/:id", updateMovie);

export default moviesRouter;
