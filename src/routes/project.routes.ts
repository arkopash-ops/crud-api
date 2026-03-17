import { Router } from "express";
import * as projectController from "../controller/project.controller.js";
import { uploadFilesMiddleware } from "../middleware/upload.middleware.js";

const router = Router();

router.post("/", uploadFilesMiddleware("files"), projectController._createNewProject);
router.get("/", projectController._getAllProjects);
router.get("/:id", projectController._getProjectByID);
router.put("/:id", uploadFilesMiddleware("files"), projectController._updateProject);
router.delete("/:id", projectController._deleteProject);

export default router;
