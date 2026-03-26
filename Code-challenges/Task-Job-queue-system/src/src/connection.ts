import IORedis from "ioredis"
import dotenv from "dotenv"
dotenv.config()

export const connection = new IORedis({
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT as string || "6379", 10),
    maxRetriesPerRequest: null,
});




