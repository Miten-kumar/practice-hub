import Bull from "bull";
import dotenv from "dotenv";
import { promisify } from "node:util";
const sleep = promisify(setTimeout);

dotenv.config();

const { REDIS_HOST, REDIS_PORT } = process.env;

export const imageProcess = new Bull("image-process-queue", {
  redis: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
  },
});

imageProcess.process(async (payload, done) => {
  payload.log("image is processing");
  payload.log("fetching image type and compression parameters");
  payload.progress(30);
  await sleep(3000);

  payload.log("perform compressing operations");
  payload.progress(80);
  await sleep(3000);

  payload.log("image compressed successfully");
  payload.progress(100);
  done();
});
