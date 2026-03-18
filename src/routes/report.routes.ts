import express from "express";
import { projectCSV } from "../controller/report.controller.js";

const router = express.Router();


/**
 * @swagger
 * api/csv/projects:
 *   get:
 *     summary: Export projects as CSV
 *     description: Download all projects as a CSV file
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: CSV file downloaded successfully
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: No projects found
 *       500:
 *         description: Server error
 */

router.get("/projects", projectCSV);

export default router;
