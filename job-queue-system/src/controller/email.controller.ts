import type { Request, Response } from "express";
import { emailQueue } from "../queues/email.queue.js";

export const sendEmail = (req: Request, res: Response) => {
  const emailData = req.body;
  emailQueue.add(emailData, {
    attempts: 5,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  });
  res.status(200).json({ message: "the mail will sent shortly" });
};
