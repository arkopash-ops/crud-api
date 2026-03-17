import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect("mongodb://localhost:27017/winston-user");
        logger.info("MongoDB connected");
    } catch (error) {
        logger.error("MongoDB connection failed", { error });
        process.exit(1);
    }
};

export default connectDB;
