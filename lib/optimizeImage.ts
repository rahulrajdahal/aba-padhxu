import "server-only";

interface OptimizeOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export const optimizeImage = async (
  buffer: Buffer,
  options: OptimizeOptions = {},
): Promise<Buffer> => {
  const sharp = (await import("sharp")).default;
  const { maxWidth = 1400, maxHeight = 1400, quality = 80 } = options;

  let processor = sharp(buffer);

  processor = processor.resize({
    width: maxWidth,
    height: maxHeight,
    fit: "inside",
    withoutEnlargement: true,
  });

  return await processor.avif({ quality }).toBuffer();
};
