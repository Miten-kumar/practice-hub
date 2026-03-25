import Queue from "bull";
import { redisConfig } from "../config/redis";

export const emailQueue = new Queue("email-queue", redisConfig);

type EmailJob = {
  to: string;
  subject: string;
  body: string;
};

export const addEmailJob = async (data: EmailJob) => {
  await emailQueue.add(data, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    priority: 1,
    removeOnComplete: true,
  });
};
