import fs from "fs";
import path from "path";

export const mergeChunks = async (
  fileId: string,
  fileName: string,
  totalChunks: number,
) => {
  const chunkDir = path.join("uploads/chunks", fileId);
  const finalPath = path.join("uploads/files", fileName);

  const writeStream = fs.createWriteStream(finalPath);

  for (let i = 0; i < totalChunks; i++) {
    const chunkPath = path.join(chunkDir, `chunk-${i}`);

    const data = fs.readFileSync(chunkPath);

    writeStream.write(data);
  }

  writeStream.end();

  return finalPath;
};
