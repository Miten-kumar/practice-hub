import express from "express";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

export default app;