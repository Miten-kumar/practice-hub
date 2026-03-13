import express from "express";
import userRoutes from "./routes/user.routes"
import taskRoutes from './routes/task.routes'

const app = express();
app.use(express.json());

app.use("/users",userRoutes)
app.use('/tasks',taskRoutes)

export default app;