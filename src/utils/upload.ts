import multer from "multer";
import logger from "./logger.js";

const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["application/pdf", "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]; // PDF and DOC files
        if (allowedTypes.includes(file.mimetype)) {
            logger.info(`Accepted file: ${file.originalname} (${file.mimetype})`);
            cb(null, true);
        } else {
            logger.error(`Rejected file: ${file.originalname} - invalid type`);
            cb(new Error("Only PDF or DOC files are allowed"));
        }
    },
});
