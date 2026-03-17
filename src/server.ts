import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 8080;

connectDB();

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
