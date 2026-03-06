import sharp from "sharp";

export const compressImage = async (
  inputPath: string,
  outputPath: string
) => {
  await sharp(inputPath)
    .resize(1024)
    .jpeg({ quality: 70 })
    .toFile(outputPath);
};