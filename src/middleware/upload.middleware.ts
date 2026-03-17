import type { Request, Response, NextFunction } from "express";
import { cloudinary } from "../config/cloudinary.js";
import { upload } from "../utils/upload.js";
import logger from "../utils/logger.js";

export const uploadFilesMiddleware = (fieldName: string) => {
    // This middleware will handle file uploads for a given field name
    return [
        upload.array(fieldName, 5), // max 5 files
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
                    logger.warn("No files uploaded(upload.middleware)");
                    return next(); // no files uploaded
                }

                const files = req.files as Express.Multer.File[];
                const uploadedUrls: string[] = [];

                // Upload files to Cloudinary in parallel
                await Promise.all(
                    files.map(
                        (file) =>
                            new Promise<void>((resolve, reject) => {
                                const originalName = file.originalname;
                                const stream = cloudinary.uploader.upload_stream(
                                    {
                                        resource_type: "raw",
                                        folder: "projectfile",
                                        public_id: originalName.replace(/\.[^/.]+$/, ""),
                                        use_filename: true,
                                        unique_filename: false
                                    },
                                    (error, result) => {
                                        if (error) return reject(error);
                                        uploadedUrls.push(result!.secure_url);
                                        resolve();
                                    }
                                );
                                stream.end(file.buffer);
                            })
                    )
                );

                // Attach uploaded URLs to request object
                (req as any).uploadedFiles = uploadedUrls;
                logger.info("File uploaded(upload.middleware)");
                next();
            } catch (error) {
                logger.error("error in upload.middleware");
                next(error);
            }
        },
    ];
};
