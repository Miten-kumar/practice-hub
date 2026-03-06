import fs from "fs";
import path from "path";

export function saveChunk(
  fileId: string,
  chunkIndex: number,
  data: Buffer
) {

  const chunkDir = path.join("chunks", fileId);

  if (!fs.existsSync(chunkDir)) {
    fs.mkdirSync(chunkDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(chunkDir, `${chunkIndex}`),
    data
  );
}

export function mergeChunks(fileId: string, totalChunks: number, filename: string) {

  const chunkDir = path.join("chunks", fileId);
  const output = path.join("uploads", filename);

  const writeStream = fs.createWriteStream(output);

  for (let i = 0; i < totalChunks; i++) {
    const chunk = fs.readFileSync(path.join(chunkDir, `${i}`));
    writeStream.write(chunk);
  }

  writeStream.end();

  return output;
}