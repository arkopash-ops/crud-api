import { Schema, Document, model } from "mongoose";
import type { ProjectInput } from "../types/project.types.js";
import { projectStatusSchema } from "../schemas/project.schema.js";

export interface ProjectDocument extends ProjectInput, Document { }

const projectLocationSchema = new Schema({
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
}, { _id: false });

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
        minlength: 3,
    },

    description: {
        type: String,
        required: true,
        minlength: 10,
    },

    projectMembers: {
        type: [String],
        default: [],
    },

    projectManagers: {
        type: [String],
        required: true,
    },

    totalMembers: {
        type: Number,
        required: true,
        min: 0,
    },

    projectLocation: {
        type: projectLocationSchema,
        required: true,
    },

    projectFiles: {
        type: [String],
        default: [],
    },

    startDate: {
        type: Date,
        required: true,
    },

    endDate: {
        type: Date,
        required: true,
    },

    status: {
        type: String,
        enum: projectStatusSchema.options,
        default: "pending",
    },

    isComplete: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const ProjectModel = model<ProjectDocument>(
    "Project",
    projectSchema
);

export default ProjectModel;
