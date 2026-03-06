import express from "express";
import {
  mergeFileChunks,
  uploadChunk,
} from "../controller/chunkUploadController.js";
import { chunkUpload } from "../middleware/chunkMulter.js";

const router = express.Router();

router.post("/upload-chunk", chunkUpload.single("chunk"), uploadChunk);

router.post("/merge-chunks", mergeFileChunks);

export default router;
