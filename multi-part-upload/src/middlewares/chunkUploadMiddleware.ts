import multer from "multer";

const storage = multer.memoryStorage();

export const chunkUpload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});