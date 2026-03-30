import type { ApiResponse } from "@/types";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getAllLeaveRequestAPI, getLeaveRequestByDateRangeAPI, getLeaveRequestByDepartmentAPI, getLeaveRequestByStatusAPI, getLeaveRequestByUserIdAPI, getPendingLeaveRequestCountAPI } from "./api";

export const useGetPendingLeaveRequestCount = (
    options?: UseQueryOptions<ApiResponse<any>>
) => {
    return useQuery({
        queryKey: ['pendingLeaveRequestCount'],
        queryFn: () => getPendingLeaveRequestCountAPI(),
        ...options,
    });
};

export const useGetAllLeaveRequests = (
    options?: UseQueryOptions<ApiResponse<any>>
) => {
    return useQuery({
        queryKey: ['allLeaveRequests'],
        queryFn: () => getAllLeaveRequestAPI(),
        ...options,
    });
};

export const useGetLeaveRequestByUserId = (
    employeeId: string,
    options?: UseQueryOptions<ApiResponse<any>>
) => {
    return useQuery({
        queryKey: ['leaveRequest', employeeId],
        queryFn: () => getLeaveRequestByUserIdAPI(employeeId),
        ...options,
    });
};

export const useGetLeaveRequestByStatus = (
    status: any,
    options?: UseQueryOptions<ApiResponse<any>>
) => {
    return useQuery({
        queryKey: ['leaveRequest', status],
        queryFn: () => getLeaveRequestByStatusAPI(status),
        enabled: !!status,
        ...options,
    });
};

export const useGetLeaveRequestByDepartment = (
    departmentId: string,
    options?: UseQueryOptions<ApiResponse<any>>
) => {
    return useQuery({
        queryKey: ['leaveRequest', departmentId],
        queryFn: () => getLeaveRequestByDepartmentAPI(departmentId),
        ...options,
    });
};

export const useGetLeaveRequestByDateRange = (
    fromDate: Date,
    toDate: Date,
    options?: UseQueryOptions<ApiResponse<any>>
) => {
    return useQuery({
        queryKey: ['leaveRequest', fromDate, toDate],
        queryFn: () => getLeaveRequestByDateRangeAPI(fromDate, toDate),
        enabled: !!fromDate && !!toDate,
        ...options,
    });
};