import { Worker } from "bullmq";
import {connection} from "../connection";

const imageWorker = new Worker(
  "image-queue",
  async (job) => {
    console.log("Processing image:", job.id);

    try{
      await job.updateProgress(10);
      await new Promise((res) => setTimeout(res, 1000));
      await job.updateProgress(50)

      if (Math.random() < 0.3) {
        throw new Error("image processing failure");
      }

      await new Promise((res) => setTimeout(res, 1000));
      await job.updateProgress(100);

      console.log(`Image processed: ${job.id}`);

    } catch (error) {
      console.error(`Error in job ${job.id}:`, error);
      throw error; 
    }
  },
  { connection, concurrency: 3 }
);

imageWorker.on("completed", (job) => {
  console.log(`Job completed: ${job.id}`);
});

imageWorker.on("failed", (job, err) => {
  console.log(`Job failed: ${job?.id}`, err.message);
});

imageWorker.on('progress', (job, progress) => {
  console.log(`Job ${job.id} progress: ${progress}%`);
});