import { z } from "zod";

export const departmentSchema = z.object({
    departmentName: z.string().min(2, "Department name is required"),
    description: z.string().min(5, "Description is required"),
});

export type DepartmentSchemaPayload = z.infer<typeof departmentSchema>;

