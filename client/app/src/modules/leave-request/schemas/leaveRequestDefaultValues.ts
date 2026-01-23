import type { LeaveRequestSchemaPayload, UpdateLeaveRequestPayload } from "./leaveRequestSchemas";

export const leaveRequestDefaultValues: LeaveRequestSchemaPayload = {
  reason: "",
  fromDate: "",
  toDate: "",
  applicantId: 0,
  LeaveType: "",
  departmentId: 0
};

export const updateLeaveRequestDefaultValues: UpdateLeaveRequestPayload = {
  leaveRequestId: 0,
  approve: false,
  reviewedById: 0,
  adminComment: "",
};
