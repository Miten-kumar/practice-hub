import express from "express";
import { rateLimiter } from "./middlewares/rateLimiter";
import { errorHandler } from "./middlewares/errorHandler";
import { connectRedis } from "./config/redis";
import { requestLogger } from "./middlewares/logger";
import userRouter from "./routes/userRoutes";
const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(rateLimiter);

app.use("/user", userRouter);
app.get("/", (req, res) => {
  console.log("get");
  res.json({ message: "working" });
});
app.use(errorHandler);
async function startServer() {
  await connectRedis();
  app.listen(3000, () => {
    console.log("server running on port : 3000");
  });
}

startServer();
