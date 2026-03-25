import Queue from "bull";
import { redisConfig } from "../config/redis";

export const imageQueue = new Queue("image-queue", redisConfig);

type ImageJob = {
  imagePath: string;
};

export const addImageJob = async (data: ImageJob) => {
  await imageQueue.add(data, {
    attempts: 2,
    priority: 2,
    removeOnComplete: true,
  });
};
