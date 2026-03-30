import type { ApiResponse } from "@/types";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getAllUsersAPI, getEmployeeCountAPI, getUserByIdAPI } from "./api";

export const useGetEmployeeCount = (
    options?: UseQueryOptions<ApiResponse<any>>
) => {
    return useQuery({
        queryKey: ['employeeCount'],
        queryFn: () => getEmployeeCountAPI(),
        ...options,
    });
};
 
export const useGetAllUsers = (
    options?: UseQueryOptions<ApiResponse<any>>
) => {
    return useQuery({
        queryKey: ['allUsers'],
        queryFn: () => getAllUsersAPI(),
        ...options,
    });
};
 
export const useGetUserById = (
    id: string,
    options?: UseQueryOptions<ApiResponse<any>>
) => {
    return useQuery({
        queryKey: ['userById'],
        queryFn: () => getUserByIdAPI(id),
        enabled: !!id,
        ...options,
    });
};