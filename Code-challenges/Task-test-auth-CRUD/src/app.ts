import express from "express";
import userRoutes from "./routes/user.routes"
import taskRoutes from './routes/task.routes'
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
app.use(express.json());

app.use("/users",userRoutes)
app.use('/api',taskRoutes)

app.use(errorHandler)

export default app;