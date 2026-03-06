import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { compressImage } from "../utils/imageCompressor";
import { v4 as uuid } from "uuid";

export const uploadFiles = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const uploadedFiles = [];

    for (const file of files) {
      const filePath = file.path;

      if (file.mimetype.startsWith("image")) {
        const compressedPath = `uploads/compressed-${file.filename}`;

        await compressImage(filePath, compressedPath);

        uploadedFiles.push({
          name: file.filename,
          compressed: true,
        });
      } else {
        uploadedFiles.push({
          name: file.filename,
          compressed: false,
        });
      }
    }

    res.json({
      success: true,
      files: uploadedFiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};

export const initializeUpload = (req: Request, res: Response) => {
  const { fileName, fileSize, chunkSize } = req.body;

  const fileId = uuid();
  const totalChunks = Math.ceil(fileSize / chunkSize);

  const chunkDir = path.join("chunks", fileId);

  if (!fs.existsSync(chunkDir)) {
    fs.mkdirSync(chunkDir, { recursive: true });
  }

  res.json({
    success: true,
    fileId,
    totalChunks,
  });
};

/* ---------------- UPLOAD CHUNK ---------------- */

export const uploadChunk = (req: Request, res: Response) => {
  try {
    const { fileId, chunkIndex } = req.body;

    if (!fileId || chunkIndex === undefined ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const chunk = req.file;

    if (!chunk) {
      return res.status(400).json({
        success: false,
        message: "Chunk not received",
      });
    }

    const chunkPath = path.join("chunks", fileId, chunkIndex);

    fs.writeFileSync(chunkPath, chunk.buffer);

    res.json({
      success: true,
      message: `Chunk ${chunkIndex} uploaded`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Chunk upload failed",
      error: error,
    });
  }
};

/* ---------------- MERGE CHUNKS ---------------- */

export const mergeChunks = (req: Request, res: Response) => {
  const { fileId, fileName, totalChunks } = req.body;

  const chunkDir = path.join("chunks", fileId);
  const finalFilePath = path.join("uploads", fileName);

  const writeStream = fs.createWriteStream(finalFilePath);

  for (let i = 0; i < totalChunks; i++) {
    const chunkPath = path.join(chunkDir, `${i}`);
    const data = fs.readFileSync(chunkPath);
    writeStream.write(data);
  }

  writeStream.end();

  /* cleanup */
  fs.rmSync(chunkDir, { recursive: true, force: true });

  res.json({
    success: true,
    message: "File uploaded successfully",
    path: finalFilePath,
  });
};
