import sharp from "sharp";

export const compressImage = async (filepath: string): Promise<string> => {
  const outputpath = filepath.replace(/(\.\w+)$/, "-compressed.webp");

  await sharp(filepath)
    .resize({ width: 1200 })
    .webp({ quality: 70 })
    .toFile(outputpath);

  return outputpath;
};
