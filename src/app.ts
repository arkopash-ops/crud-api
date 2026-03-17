import express from 'express';
import projectRouter from './routes/project.routes.js';
import reportRouter from './routes/report.routes.js';

const app = express();

app.use(express.json());
app.use("/api/projects", projectRouter);
app.use("/api/csv", reportRouter);

export default app;
