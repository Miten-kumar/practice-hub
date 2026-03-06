import express from "express";
import { upload } from "../middlewares/uploadMiddleware";
import { initializeUpload, mergeChunks, uploadChunk, uploadFiles } from "../controllers/uploadController";
import { chunkUpload } from "../middlewares/chunkUploadMiddleware";

const router = express.Router();

router.post("/upload", upload.array("files", 10), uploadFiles);
/* initialize upload */
router.post("/initialize-upload", initializeUpload);

/* upload chunk */
router.post("/upload-chunk", chunkUpload.single("chunk"), uploadChunk);

/* merge chunks */
router.post("/merge-chunks", mergeChunks);

export default router;