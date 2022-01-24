import sharp from "sharp";

export const svgToPng = async (
  svg: string,
  width: number,
  height: number
): Promise<string> => {
  const buffer = Buffer.from(svg);

  const resultBuffer = await sharp(buffer, { density: 600 })
    .resize(width, height)
    .png()
    .toBuffer();

  return resultBuffer.toString("base64");
};
