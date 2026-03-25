import { imageQueue } from "../queues/image.queue";
import { addToDLQ } from "../queues/dlq.queue";
import sharp from "sharp";

imageQueue.process(2, async (job) => {
  const { input, output } = job.data;

  try {
    await job.progress(20);

    await sharp(input).resize(300, 300).toFile(output);

    await job.progress(100);

    return true;
  } catch (err) {
    if (job.attemptsMade >= 1) {
      await addToDLQ("image", job.data, err);
    }
    throw err;
  }
});
