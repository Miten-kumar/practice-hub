import { Request, Response } from "express";
import { compressImage } from "../utils/compressImage.js";

export const uploadFiles = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "no file uploaded" });
    }

    const uploadedFiles = files.map((file) => {
      return {
        filename: file.filename,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype,
      };
    });

    const processedFile = [];

    for (const file of files) {
      let finalPath = file.path;

      if (file.mimetype.startsWith("image")) {
        finalPath = await compressImage(file.path);
      }

      processedFile.push({
        filename: file.filename,
        path: finalPath,
        size: file.size,
        type: file.mimetype,
      });
    }

    res
      .status(201)
      .json({ message: "files uploaded successfully", data: processedFile });
  } catch (err) {
    res.status(500).json({
      message: "Upload failed",
      err,
    });
  }
};
