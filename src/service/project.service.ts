import ProjectModel from "../model/project.model.js";
import { projectZodSchema, updateProjectSchema } from "../schemas/project.schema.js";
import type { ProjectInput } from "../types/project.types.js";
import logger from "../utils/logger.js";

export const createNewProject = async (data: ProjectInput, uploadedFiles: string[] = []) => {
    try {
        const validatedData = projectZodSchema.parse(data);
        const totalMembers = (validatedData.projectMembers.length)
            + (validatedData.projectManagers.length);

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


export const updateProject = async (
    projectId: string,
    data: Partial<ProjectInput>,
    uploadedFiles: string[] = []
) => {
    try {
        const validatedData = updateProjectSchema.parse(data);

        const project = await ProjectModel.findById(projectId);
        if (!project) {
            logger.warn(`Project with ID ${projectId} not found for update.`);
            throw new Error("Project not found");
        }

        if (validatedData.projectMembers) {
            project.projectMembers = Array.from(
                new Set([...project.projectMembers, ...validatedData.projectMembers])
            ); // avoid duplicates
        }
        if (validatedData.projectManagers) {
            project.projectManagers = Array.from(
                new Set([...project.projectManagers, ...validatedData.projectManagers])
            );
        }
        project.totalMembers = project.projectMembers.length + project.projectManagers.length;

        if (validatedData.projectName) project.projectName = validatedData.projectName;
        if (validatedData.description) project.description = validatedData.description;
        if (validatedData.projectLocation) project.projectLocation = validatedData.projectLocation;
        if (validatedData.startDate) project.startDate = validatedData.startDate;
        if (validatedData.endDate) project.endDate = validatedData.endDate;
        if (validatedData.status) project.status = validatedData.status;
        if (validatedData.isComplete !== undefined) project.isComplete = validatedData.isComplete;

        // Append uploaded files
        if (uploadedFiles.length > 0) {
            project.projectFiles = [...project.projectFiles, ...uploadedFiles];
        }

        // Save changes
        await project.save();
        logger.info(`Project with ID ${projectId} updated successfully.`);
        return project;
    } catch (error: any) {
        logger.error(`Failed to update project with ID ${projectId}: ${error.message}`);
        throw new Error(error.message || "Failed to update project");
    }
};


export const deleteProject = async (projectId: string) => {
    try {
        const project = await ProjectModel.findByIdAndDelete(projectId);

        if (!project) {
            logger.warn(`Project with ID ${projectId} not found for deletion.`);
            throw new Error("Project not found");
        }

        logger.info(`Project with ID ${projectId} deleted successfully.`);
        return project;
    } catch (error: any) {
        logger.error(`Failed to delete project with ID ${projectId}: ${error.message}`);
        throw new Error(error.message || "Failed to delete project");
    }
};
