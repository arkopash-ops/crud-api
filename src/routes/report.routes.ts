import express from "express";
import { projectCSV } from "../controller/report.controller.js";

const router = express.Router();

router.get("/projects", projectCSV);

export default router;
