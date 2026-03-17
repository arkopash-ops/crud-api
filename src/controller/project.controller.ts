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


export const _getAllProjects = async (req: Request, res: Response) => {
    try {
        const projects = await projectService.getAllProjects();
        return res.status(200).json({
            message: "Projects fetched successfully",
            data: projects,
        });
    } catch (error: any) {
        logger.error(`Get Projects Error: ${error.message}`);
        return res.status(500).json({
            message: error.message || "Failed to fetch projects",
        });
    }
};


export const _getProjectByID = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid or missing id."
        });
    }

    try {
        const project = await projectService.getProjectByID(id);
        return res.status(200).json({
            message: "Project fetched successfully",
            data: project,
        });
    } catch (error: any) {
        logger.error(`Get Project By ID Error: ${error.message}`);
        return res.status(404).json({
            message: error.message || "Project not found",
        });
    }
};


export const _updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid or missing id."
        });
    }

    const uploadedFiles: string[] = (req as any).uploadedFiles || [];

    try {
        const updatedProject = await projectService.updateProject(id, req.body, uploadedFiles);
        return res.status(200).json({
            message: "Project updated successfully",
            data: updatedProject,
        });
    } catch (error: any) {
        logger.error(`Update Project Error: ${error.message}`);
        return res.status(404).json({
            message: error.message || "Failed to update project",
        });
    }
};


export const _deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid or missing id.",
        });
    }

    try {
        const deletedProject = await projectService.deleteProject(id);

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully",
            data: deletedProject,
        });
    } catch (error: any) {
        logger.error(`Delete Project Error: ${error.message}`);
        return res.status(404).json({
            success: false,
            message: error.message || "Failed to delete project",
        });
    }
};
