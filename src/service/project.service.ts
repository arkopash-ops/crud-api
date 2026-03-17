import ProjectModel from "../model/project.model.js";
import { projectZodSchema } from "../schemas/project.schema.js";
import type { ProjectInput } from "../types/project.types.js";
import logger from "../utils/logger.js";

export const createNewProject = async (data: ProjectInput, uploadedFiles: string[] = []) => {
    try {
        const validatedData = projectZodSchema.parse(data);
        const totalMembers = (validatedData.projectMembers?.length || 0)
            + (validatedData.projectManagers?.length || 0);

        const project = new ProjectModel({
            ...validatedData,
            projectFiles: uploadedFiles,
            totalMembers
        });

        await project.save();
        logger.info("Project Created.")
        return project;
    } catch (error: any) {
        logger.error("Failed to create project.");
        throw new Error(error.message || "Failed to create project");
    }
};


export const getAllProjects = async () => {
    try {
        const projects = await ProjectModel.find().lean();
        logger.info(`Fetched ${projects.length} projects.`);
        return projects;
    } catch (error: any) {
        logger.error("Failed to fetch projects.");
        throw new Error(error.message || "Failed to fetch projects");
    }
};


export const getProjectByID = async (projectId: string) => {
    try {
        const project = await ProjectModel.findById(projectId).lean();
        if (!project) {
            logger.warn(`Project with ID ${projectId} not found.`);
            throw new Error("Project not found");
        }
        logger.info(`Project with ID ${projectId} fetched successfully.`);
        return project;
    } catch (error: any) {
        logger.error(`Failed to fetch project with ID ${projectId}: ${error.message}`);
        throw new Error(error.message || "Failed to fetch project");
    }
};


export const updateProject = async () => { };


export const deletProject = async () => { };
