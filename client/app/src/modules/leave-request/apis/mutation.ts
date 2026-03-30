import type { ApiResponse } from "@/types";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { applyLeaveRequestAPI, cancelLeaveAPI, updateLeaveRequestAPI } from "./api";

export const useApplyLeaveRequest = (
    options?: UseMutationOptions<ApiResponse<any>, any, any>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["applyLeaveRequest"],
        mutationFn: (data: any) => applyLeaveRequestAPI(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["leaveRequest"] });
        },
        ...options,
    });
};

export const useUpdateLeaveRequest = (
    options?: UseMutationOptions<ApiResponse<any>, any, any>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["updateLeaveRequest"],
        mutationFn: (data: any) => updateLeaveRequestAPI(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["leaveRequest"] });
        },
        ...options,
    });
};

export const useCancelLeave = (
    options?: UseMutationOptions<ApiResponse<any>, any, number>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["cancelLeave"],
        mutationFn: (leaveId: number) => cancelLeaveAPI(leaveId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["leaveRequest"] });
        },
        ...options,
    });
};