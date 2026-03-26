import type { Request, Response } from "express";
import { sendEmail } from "../queues/emailQueue";
import type { userData } from "../types.js";
import { processImage } from "../queues/imageQueue";

export async function createUser(req: Request, res: Response) {
  const { userId, email } = req.body as Partial<userData>;

  if (!userId || !email) {
    return res.status(400).json({
      message: "userId and email are required",
    });
  }

  const job = await sendEmail({ userId, email });

  return res.status(201).json({
    message: "User queued successfully",
    jobId: job.id,
    user: { userId, email },
  });
}

export async function imageUpload(req: Request, res: Response) {
  const { imageUrl } = req.body as { imageUrl: string };

  const job = await processImage({ imageUrl });

  return res.status(201).json({
    message: "Image upload queued successfully",
    jobId: job.id,
  });

}
