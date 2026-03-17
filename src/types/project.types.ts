import {z} from "zod";
import { projectZodSchema } from "../schemas/project.schema.js";

export type ProjectInput = z.infer<typeof projectZodSchema>
