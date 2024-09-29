import { v2 as cloudinary } from 'cloudinary';
import { Request } from 'express';
import multer from 'multer';
import { Readable } from 'stream';
import config from '../config';

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name!,
  api_key: config.cloudinary_api_key!,
  api_secret: config.cloudinary_api_secret!,
});

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadImageToCloudinary = async (fileBuffer: Buffer, folder: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url!);
        }
      }
    );

    const readableStream = Readable.from(fileBuffer);
    readableStream.pipe(uploadStream);
  });
};
