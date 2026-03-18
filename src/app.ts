import express from 'express';

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from './docs/swagger.js';

import projectRouter from './routes/project.routes.js';
import reportRouter from './routes/report.routes.js';
import homeRouter from './routes/home.routes.js';

const app = express();

app.use(express.json());

// swagger routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// my routes
app.use("/", homeRouter);
app.use("/api/projects", projectRouter);
app.use("/api/csv", reportRouter);

export default app;
