import { Request, Response } from "express";
import { mergeChunks } from "../utils/mergeChunks.js";

export const uploadChunk = async (req: Request, res: Response) => {
  try {
    const { chunkIndex } = req.body;

    return res.status(200).json({
      message: "Chunk uploaded",
      chunkIndex,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Chunk upload failed",
      error,
    });
  }
};

export const mergeFileChunks = async (req: Request, res: Response) => {
  try {
    const { fileId, fileName, totalChunks } = req.body;

    const filePath = await mergeChunks(fileId, fileName, Number(totalChunks));

    return res.status(200).json({
      message: "File merged successfully",
      filePath,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Merge failed",
      error,
    });
  }
};
