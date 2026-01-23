import { z } from "zod";

export const leaveRequestSchema = z.object({
  reason: z.string().min(2, "Reason is required"),
  fromDate: z.string().min(1, "From date is required"),
  toDate: z.string().min(1, "To date is required"),
  applicantId: z.number().optional(),
  LeaveType: z.string().min(1, "Leave type is required"),
  departmentId: z.number().optional()
}).refine(
  (data) => new Date(data.fromDate) <= new Date(data.toDate),
  {
    message: "From date cannot be greater than To date",
    path: ["toDate"],
  }
);


export const updateLeaveRequestSchema = z.object({
  leaveRequestId: z.number(),
  approve: z.boolean(),
  reviewedById: z.number(),
  adminComment: z.string().min(1, "Admin comment is required"),
});



export type LeaveRequestSchemaPayload = z.infer<typeof leaveRequestSchema>;
export type UpdateLeaveRequestPayload = z.infer<typeof updateLeaveRequestSchema>;
