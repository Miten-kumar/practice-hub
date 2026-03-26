import { Queue } from "bullmq";
import {connection} from "../connection";

export const imageQueue = new Queue("image-queue", {
  connection,
});

export async function processImage({ imageUrl }: { imageUrl: string }) {
  const job = await imageQueue.add(
    "resize-image",
    { imageUrl },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
      priority: 2,
    }
  );

  console.log(`Job ${job.id} added to image queue`);
  return job;
}