import { Queue } from "bullmq";
import dotenv from "dotenv";
import type { userData } from "../types";
import { connection } from "../connection";

dotenv.config();

export const emailQueue = new Queue("email", {
  connection
});

export async function sendEmail({ userId, email }: userData) {
  const job = await emailQueue.add(
    "welcome email",
    {
      userId,
      email,
      template: "hello welcome",
    },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 3000,
      },
    },
  );

  console.log(`job ${job.id} added to queue`);
  return job;
}
