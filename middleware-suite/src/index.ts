import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import { apiLimiter } from "./middlewares/rateLimiter";
import { responseFormatter } from "./middlewares/responseFormatter";
import { errorHandler } from "./middlewares/errorHandler";
import { connectRedis, redisClient } from "./config/redis";
import { requestLogger } from "./middlewares/requestLogger";

dotenv.config();
const app = express();
const port = process.env.PORT;

const start = async () => {
  await connectRedis();
  
  console.log("redis connected");
  
  app.use(express.json());
  app.use(requestLogger)
  app.use(apiLimiter());
  app.use(responseFormatter);
  
  app.use("/users", userRoutes);
  app.get("/", (req, res) => {
    res.send("Hello, TypeScript + Node.js + Express!");
  });
  
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};
start()