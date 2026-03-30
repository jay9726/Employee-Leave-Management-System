import type { ApiResponse } from "@/types";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { addDepartmentAPI, deleteDepartmentAPI, updateDepartmentAPI } from "./api";

export const useAddDepartment = (
    options?: UseMutationOptions<ApiResponse<any>, any, any>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["addDepartment"],
        mutationFn: (data: any) => addDepartmentAPI(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allDepartments"] });
        },
        ...options,
    });
};

export const useUpdateDepartment = (
    options?: UseMutationOptions<
        ApiResponse<any>,
        any,
        { departmentId: string; data: any }
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["updateDepartment"],
        mutationFn: ({ departmentId, data }) => updateDepartmentAPI(departmentId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allDepartments"] });
        },
        ...options,
    });
};

export const useDeleteDepartment = (
    options?: UseMutationOptions<ApiResponse<any>, any, string>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["deleteDepartment"],
        mutationFn: (departmentId: string) => deleteDepartmentAPI(departmentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allDepartments"] });
        },
        ...options,
    });
};