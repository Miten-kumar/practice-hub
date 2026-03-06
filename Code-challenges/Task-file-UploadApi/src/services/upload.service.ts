import sharp from "sharp";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

export async function processFile(file: Express.Multer.File) {

  const id = uuid();
  const outputPath = path.join("src/uploads", id + path.extname(file.originalname));

  if (file.mimetype.startsWith("image")) {

    await sharp(file.buffer)
      .resize({ width: 1200 })
      .jpeg({ quality: 80 })
      .toFile(outputPath);

  } else {

    fs.writeFileSync(outputPath, file.buffer);

  }

  return {
    id,
    filename: file.originalname,
    path: outputPath
  };
}