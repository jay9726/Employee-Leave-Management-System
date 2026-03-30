import type { ApiResponse } from "@/types";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getAllCompanyHolidaysAPI, getCompanyHolidayByIdAPI } from "./api";

export const useGetAllCompanyHolidays = (
    options?: UseQueryOptions<ApiResponse<any>>
) => {
    return useQuery({
        queryKey: ['allCompanyHolidays'],
        queryFn: () => getAllCompanyHolidaysAPI(),
        ...options,
    });
};
 
export const useGetCompanyHolidayById = (
    companyholidayId: string,
    options?: UseQueryOptions<ApiResponse<any>>
) => {
    return useQuery({
        queryKey: ['companyHolidayById'],
        queryFn: () => getCompanyHolidayByIdAPI(companyholidayId),
        enabled: !!companyholidayId,
        ...options,
    });
};