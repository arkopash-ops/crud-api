import type { Request, Response } from 'express';
import { Parser } from "json2csv";
import ProjectModel from "../model/project.model.js";
import logger from "../utils/logger.js";
import type { ProjectInput } from '../types/project.types.js';

interface CSVProject {
    projectName: string;
    description: string;
    projectLocation: string;
    startDate: Date;
    endDate: Date;
    status: "pending" | "in-progress" | "completed";
    isComplete: boolean;
    totalMembers: number | undefined;
    projectMembers: string;
    projectManagers: string;
    projectFiles: string;
}

export const projectCSV = async (req: Request, res: Response) => {
    try {
        const projects = await ProjectModel.find().lean();

        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: "No projects found to export" });
        }

        // Flatten arrays/objects for CSV readability
        const formattedProjects: CSVProject[] = projects.map(p => ({
            projectName: p.projectName,
            description: p.description,
            projectLocation: `${p.projectLocation.city}, ${p.projectLocation.state}, ${p.projectLocation.country}`,
            startDate: p.startDate,
            endDate: p.endDate,
            status: p.status,
            isComplete: p.isComplete,
            totalMembers: p.totalMembers,
            projectMembers: p.projectMembers.join(", "),
            projectManagers: p.projectManagers.join(", "),
            projectFiles: p.projectFiles.join(", ")
        }));

        const fields = Object.keys(formattedProjects[0]!);
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(formattedProjects);

        res.header("Content-Type", "text/csv");
        res.attachment("projects-report.csv");

        logger.info("Project CSV report generated.");
        return res.send(csv);
    } catch (error: any) {
        logger.error(`Failed to generate project CSV: ${error.message}`);
        return res.status(500).json({ message: error.message || "Failed to generate CSV report" });
    }
};
