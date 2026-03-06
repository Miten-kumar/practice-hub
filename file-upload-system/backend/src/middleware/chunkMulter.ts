import multer from "multer";
import fs from "node:fs";
import path from "node:path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { fileId } = req.body;

    const chunkDir = path.join("uploads/chunks", fileId);

    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir, { recursive: true });
    }

    cb(null, chunkDir);
  },

  filename: (req, file, cb) => {
    const { chunkIndex } = req.body;
    cb(null, `chunk-${chunkIndex}`);
  },
});

export const chunkUpload = multer({ storage });
