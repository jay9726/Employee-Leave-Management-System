import { api } from "@/lib/api";

export const getPendingLeaveRequestCountAPI = async () => {
    const res = await api.get('/LeaveRequest/pendingLeaveRequestCount');
    return res.data
}

export const getAllLeaveRequestAPI = async () => {
    const res = await api.get('/LeaveRequest');
    return res.data
}


export const getLeaveRequestByUserIdAPI = async (employeeId: string) => {
    const res = await api.get(`/LeaveRequest/user/${employeeId}`);
    return res.data
}

export const getLeaveRequestByStatusAPI = async (status: any) => {
    const res = await api.get(`/LeaveRequest/status/${status}`);
    return res.data
}

export const getLeaveRequestByDepartmentAPI = async (departmentId: string) => {
    const res = await api.get(`/LeaveRequest/department/${departmentId}`);
    return res.data
}

export const getLeaveRequestByDateRangeAPI = async (fromDate: Date, toDate: Date) => {
    const res = await api.post(`/LeaveRequest/date-range?fromDate=${fromDate}&toDate=${toDate}`);
    return res.data
}



export const applyLeaveRequestAPI = async (data: any) => {
    const res = await api.post(`/LeaveRequest/apply`, data);
    return res.data
}

export const updateLeaveRequestAPI = async (data: any) => {
    const res = await api.put(`/LeaveRequest/update`, data);
    return res.data
}

export const cancelLeaveAPI = async (leaveId: number) => {
    const res = await api.put(`/LeaveRequest/cancel/${leaveId}`);
    return res.data
}

