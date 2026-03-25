import type { Request, Response } from "express";
import { imageProcess } from "../queues/processImage.queue.js";

export const imageProcessor = (req: Request, res: Response) => {
  const { imageUrl } = req.body;
  imageProcess.add(
    { imageUrl: imageUrl },
    {
      attempts: 5,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  );

  res.status(201).json({ mesage: "the image is compressing" });
};
