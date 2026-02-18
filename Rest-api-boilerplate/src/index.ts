import express, { Request, Response } from "express";
import env from "../env";
import logger from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import moviesRouter from "./routes/movie.route";

const app = express();

console.log(`Environment Variables: ${JSON.stringify(env)}`);
app.use(logger);

app.use("/movies", moviesRouter);

app.use(errorHandler);

app.listen(Number(env.PORT), () => {
  console.log(`Server is running on port ${env.PORT}`);
});
