import { Request, Response } from "express";
import { processFile } from "../services/upload.service";

export async function uploadFiles(req: Request, res: Response) {

  try {

    const files = req.files as Express.Multer.File[];

    const uploaded = [];

    for (const file of files) {
      const result = await processFile(file);
      uploaded.push(result);
    }

    res.json({
      success: true,
      files: uploaded
    });

  } catch (error) {
      console.error(error);  
    res.status(500).json({ error: "Upload failed" });
  }
}