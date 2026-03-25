import { dlqQueue } from "../queues/dlq.queue";

dlqQueue.process(async (job) => {
  console.log("DLQ JOB:", job.data);
});