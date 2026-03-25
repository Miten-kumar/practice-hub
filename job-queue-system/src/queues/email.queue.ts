import Bull from "bull";
import dotenv from "dotenv";
import { promisify } from "node:util";
const sleep = promisify(setTimeout);

dotenv.config();

const { REDIS_HOST, REDIS_PORT } = process.env;

export const emailQueue = new Bull("email-queue", {
  redis: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
  },
});

emailQueue.process(async (payload, done) => {
  payload.log("email will sending");
  payload.log("fetching parameters");
  payload.progress(30);
  await sleep(1000);

  payload.log("sending mail via node mailer");
  payload.progress(80);
  await sleep(1000);

  payload.log("email sent successfully");
  payload.progress(100);
  done();
});

emailQueue.on("failed", (job, err) => {
  console.log(`Job ${job.id} failed after ${job.attemptsMade} attempts`);
});
