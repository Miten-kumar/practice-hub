import express from "express";
import { uploadMiddleware } from "../middlewares/multer.middleware";
import { uploadFiles } from "../controllers/fileUpload.controller";
import { uploadChunk, finalizeUpload } from "../controllers/chunkUpload.controller";

const router = express.Router();

router.post(
  "/upload",
  uploadMiddleware.array("files", 10),
  uploadFiles
);

router.post(
  "/upload/chunk",
  uploadMiddleware.single("chunk"),
  uploadChunk
);

router.post("/upload/complete", finalizeUpload);

export default router;