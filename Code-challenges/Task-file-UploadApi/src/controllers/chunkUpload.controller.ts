import { Request, Response } from "express";
import { saveChunk, mergeChunks } from "../utils/chunkManager";

export function uploadChunk(req: Request, res: Response) {

  const { fileId, chunkIndex } = req.body;

  saveChunk(fileId, Number(chunkIndex), req.file!.buffer);

  res.json({ success: true });
}

export function finalizeUpload(req: Request, res: Response) {

  const { fileId, totalChunks, filename } = req.body;

  const file = mergeChunks(fileId, Number(totalChunks), filename);

  res.json({
    success: true,
    file
  });
}