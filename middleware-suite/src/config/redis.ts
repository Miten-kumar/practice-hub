import { error } from "node:console";
import { createClient } from "redis";

export const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("error", (err) => {
  console.log("Redis Error", err);
});

export const connectRedis = async () => {
  await redisClient.connect();
};
