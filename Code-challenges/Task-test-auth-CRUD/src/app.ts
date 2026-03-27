import express from "express";
import userRoutes from "./routes/user.routes"
import taskRoutes from './routes/task.routes'
import { errorHandler } from "./middlewares/error.middleware";
import { requestLogger } from "./middlewares/requestLogger.middleware";
import { correlation } from "./middlewares/correlation.middleware";

const app = express();
app.use(express.json());

app.use(correlation)
app.use(requestLogger)

app.use("/users",userRoutes)
app.use('/api',taskRoutes)

app.use(errorHandler)

export default app;