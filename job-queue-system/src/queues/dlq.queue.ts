import Queue from "bull";
import { redisConfig } from "../config/redis";

export const dlqQueue = new Queue("dlq-queue", redisConfig);

export const addToDLQ = async (jobName: string, data: any, error: any) => {
  await dlqQueue.add({
    jobName,
    data,
    error: error?.message || error,
  });
};