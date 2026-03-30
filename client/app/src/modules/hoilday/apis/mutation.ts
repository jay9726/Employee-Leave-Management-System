import type { ApiResponse } from "@/types";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { addCompanyHolidayAPI, deleteCompanyHolidayAPI, updateCompanyHolidayAPI } from "./api";

export const useAddCompanyHoliday = (
    options?: UseMutationOptions<ApiResponse<any>, any, any>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["addCompanyHoliday"],
        mutationFn: (data: any) => addCompanyHolidayAPI(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allCompanyHolidays'] });
        },
        ...options,
    });
};

export const useUpdateCompanyHoliday = (
    options?: UseMutationOptions<
        ApiResponse<any>,
        any,
        { companyHolidayId: string; data: any }
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["updateCompanyHoliday"],
        mutationFn: ({ companyHolidayId, data }) => updateCompanyHolidayAPI(companyHolidayId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allCompanyHolidays'] });
        },
        ...options,
    });
};

export const useDeleteCompanyHoliday = (
    options?: UseMutationOptions<ApiResponse<any>, any, string>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["deleteCompanyHoliday"],
        mutationFn: (companyholidayId: string) => deleteCompanyHolidayAPI(companyholidayId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allCompanyHolidays'] });
        },
        ...options,
    });
};