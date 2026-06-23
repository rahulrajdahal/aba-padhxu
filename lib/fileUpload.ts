import { v2 as cloudinary, UploadApiOptions } from "cloudinary";

import { existsSync } from "node:fs";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { logger } from "./logger";
import { optimizeImage } from "./optimizeImage";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const prodUpload = async (
  buffer: Buffer,
  type: string,
  folder: string,
  options: UploadApiOptions | undefined,
) => {
  const mime = type;
  const encoding = "base64";
  const base64Data = buffer.toString("base64");
  const fileUri = "data:" + mime + ";" + encoding + "," + base64Data;
  return new Promise((res, rej) => {
    return cloudinary.uploader.upload(
      fileUri,
      {
        folder: `rahulrajdahal/${folder}`,
        invalidate: true,
        ...options,
      },
      (error, result) => {
        if (error) return rej(new Error(error.message));

        res(result);
      },
    );
  });
};

const devUpload = async (
  uploadDIR: string,
  fileName: string,
  buffer: Buffer,
) => {
  const filename = `${crypto.randomUUID()}_${Date.now()}_${fileName}`;
  try {
    await mkdir(uploadDIR, { recursive: true });
    await writeFile(path.join(uploadDIR, filename), buffer);
    return filename;
  } catch (error) {
    logger.error("Failed to upload image", error);
    return null;
  }
};

export const fileUpload = async (
  file: File,
  uploadDIR: string,
  options?: UploadApiOptions,
) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  if (process.env.NODE_ENV === "development") {
    const uploadPath = path.join(
      process.cwd(),
      `./public/uploads/${uploadDIR}`,
    );

    return await devUpload(uploadPath, file.name, await optimizeImage(buffer));
  }

  const uploadedFile = (await prodUpload(
    buffer,
    file.type,
    uploadDIR,
    options,
  )) as { secure_url?: string; url?: string };

  return uploadedFile?.secure_url || uploadedFile?.url;
};

export const removeUploadFile = async (fileName: string, uploadDIR: string) => {
  try {
    if (process.env.NODE_ENV === "development") {
      const filePath = path.join(
        process.cwd(),
        `./public/uploads/${uploadDIR}/${fileName}`,
      );
      if (existsSync(filePath)) await unlink(filePath);
    } else {
      await cloudinary.uploader.destroy(
        `rahulrajdahal/${uploadDIR}/${fileName}`,
      );
    }

    return true;
  } catch (error) {
    logger.error("Failed to delete image", error);
    return false;
  }
};
