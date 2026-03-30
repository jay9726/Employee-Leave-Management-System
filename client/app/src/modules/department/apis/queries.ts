import type { ApiResponse } from "@/types";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getAllDepartmentsAPI, getDepartmentByIdAPI, getDepartmentCountAPI, getOnlyDepartmentAPI } from "./api";

export const useGetDepartmentCount = (
    options?: UseQueryOptions<ApiResponse<any>>
) => {
    return useQuery({
        queryKey: ['departmentCount'],
        queryFn: () => getDepartmentCountAPI(),
        ...options,
    });
};

export const useGetOnlyDepartment = (
    options?: UseQueryOptions<ApiResponse<any>>
) => {
    return useQuery({
        queryKey: ['onlyDepartment'],
        queryFn: () => getOnlyDepartmentAPI(),
        ...options,
    });
};

export const useGetAllDepartments = (
    options?: UseQueryOptions<ApiResponse<any>>
) => {
    return useQuery({
        queryKey: ['allDepartments'],
        queryFn: () => getAllDepartmentsAPI(),
        ...options,
    });
};

export const useGetDepartmentById = (
    departmentId: string,
    options?: UseQueryOptions<ApiResponse<any>>
) => {
    return useQuery({
        queryKey: ['departmentById', departmentId],
        queryFn: () => getDepartmentByIdAPI(departmentId),
        ...options,
    });
};