import type { Request, Response } from "express";
import logger from "../utils/logger.js";
import * as projectService from "../service/project.service.js";

export const _createNewProject = async (req: Request, res: Response) => {
    try {
        const projectData = req.body;
        const uploadedFiles = (req as any).uploadedFiles || [];
        const project = await projectService.createNewProject(projectData, uploadedFiles);

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            project,
        });
    } catch (error: any) {
        logger.error("Error in _createNewProject", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to create project",
        });
    }
};


export const _getAllProjects = async (req: Request, res: Response) => { };


export const _getProjectByID = async (req: Request, res: Response) => { };


export const _updateProject = async (req: Request, res: Response) => { };


export const _deletProject = async (req: Request, res: Response) => { };
