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


export const getAllProjects = async () => { };


export const getProjectByID = async () => { };


export const updateProject = async () => { };


export const deletProject = async () => { };
