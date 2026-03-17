import { z } from "zod";

export const projectStatusSchema = z.enum([
    "pending",
    "in-progress",
    "completed",
]);


export const projectLocationSchema = z.object({
    city: z.string()
        .min(1, "City is required"),

    state: z.string()
        .min(1, "State is required"),

    country: z.string()
        .min(1, "Country is required"),
});


export const projectZodSchema = z.object({
    projectName: z.string()
        .min(3, "Project name must be at least 3 characters"),

    description: z.string()
        .min(10, "Description must be at least 10 characters"),

    projectMembers: z.array(z.string())
        .default([]),

    projectManagers: z.array(z.string())
        .min(1, "At least one manager is required"),

    totalMembers: z.number()
        .int()
        .nonnegative()
        .optional(),

    projectLocation: projectLocationSchema,

    projectFiles: z.array(z.string())
        .default([]),

    startDate: z.coerce.date(),

    endDate: z.coerce.date(),

    status: projectStatusSchema
        .default("pending"),

    isComplete: z.boolean()
        .default(false),
}).refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
});
