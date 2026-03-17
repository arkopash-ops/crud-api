import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./utils/logger.js";

const PORT = 8080;

connectDB();

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
