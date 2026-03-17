import express from 'express';
import projectRouter from './routes/project.routes.js';

const app = express();

app.use(express.json());
app.use("/api/projects", projectRouter)

export default app;
