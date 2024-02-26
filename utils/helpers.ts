import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
import { mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const prodUpload = (
  buffer: Buffer,
  type: string,
  folder: string,
  options: UploadApiOptions | undefined
) => {
  const mime = type;
  const encoding = 'base64';
  const base64Data = buffer.toString('base64');
  const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;
  return new Promise((res, rej) => {
    return cloudinary.uploader.upload(
      fileUri,
      {
        folder: `rahulrajdahal/${folder}`,
        invalidate: true,
        ...options,
      },
      (error, result) => {
        if (error) return rej(error);

        res(result);
      }
    );
  });
};

export const devUpload = async (
  uploadDIR: string,

  logoName: string,
  buffer: Buffer
) => {
  const filename = `${Date.now()}-${logoName
    .toLowerCase()
    .replace(/ /g, '-')}`;

  await writeFile(`${uploadDIR}/${filename}`, buffer).catch(() =>
    mkdirSync(path.resolve(__dirname, uploadDIR))
  );

  return filename;
};

cloudinary.config({
  cloud_name: String(process.env.CLOUDINARY_CLOUD_NAME),
  api_key: String(process.env.CLOUDINARY_API_KEY),
  api_secret: String(process.env.CLOUDINARY_API_SECRET),
  secure: true,
});


/**
 * @description image file types that are accepted.
 */
const validFileExtensions = ['jpg', 'png', 'jpeg', 'svg', 'webp'];

/**
 *
 * @param fileName - the name of the file uploaded.
 * @returns - boolean
 */
export const isValidFileType = (fileName: string) => {
  const extension = fileName.split('.').at(-1);

  if (extension) {
    if (validFileExtensions.includes(extension)) {
      return true;
    }
  }

  return false;
};


type StatusCode = 500 | 400 | 404 | 200 | 201 | 204;
type ResponseType = 'error' | 'success';

const response = (
  type: ResponseType,
  message: string,
  data: unknown,
  status: StatusCode
) => {
  return { type, message, data, status };
};

export const getErrorResponse = (
  data?: unknown,
  message = 'Server Error',
  status: StatusCode = 500
) => {
  return response('error', message, data, status);
};

export const getSuccessResponse = (
  message: string,
  data?: unknown,
  status: StatusCode = 200
) => {
  return response('success', message, data, status);
};