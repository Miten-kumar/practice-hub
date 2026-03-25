import { connectRedis } from "./config/redis.js";
import Bull from "bull";
import dotenv from "dotenv";
import { app } from "./app.js";
import { ExpressAdapter } from "@bull-board/express";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { createBullBoard } from "@bull-board/api";
import { emailQueue } from "./queues/email.queue.js";
import { imageProcess } from "./queues/processImage.queue.js";

(async () => {
  dotenv.config();
  const { REDIS_HOST, REDIS_PORT } = process.env;

  const queueList = ["email-queue"];
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath("/queues");

  const redisOptions = {
    redis: {
      host: REDIS_HOST,
      port: Number(REDIS_PORT),
    },
  };

  const queues = [new BullAdapter(emailQueue), new BullAdapter(imageProcess)];

  const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues,
    serverAdapter: serverAdapter,
  });

  app.use("/queues", serverAdapter.getRouter());

  await connectRedis();
  app.listen(3000, () => {
    console.log("server running on port : 3000");
  });
})();
// const emailQueue = new Bull("email-queue", {
//   redis: {
//     host: REDIS_HOST,
//     port: Number(REDIS_PORT),
//   },
// });

//   emailQueue.add({ from: "abc@gmail.om", to: "xyz@gmail.om" });

//   const queues = queueList
//     .map((qs) => new Bull(qs, redisOptions))
//     .map((q) => new BullAdapter(q));
