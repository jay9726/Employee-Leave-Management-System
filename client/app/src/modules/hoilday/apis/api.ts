import { api } from "@/lib/api";


export const getAllCompanyHolidaysAPI = async () => {
    const res = await api.get(`/CompanyHoliday`);
    return res.data
}

export const getCompanyHolidayByIdAPI = async (companyholidayId: string) => {
    const res = await api.get(`/CompanyHoliday/${companyholidayId}`);
    return res.data
}

export const addCompanyHolidayAPI = async (data: any) => {
    const res = await api.post(`/CompanyHoliday`, data);
    return res.data
}

export const updateCompanyHolidayAPI = async (companyholidayId: string, data: any) => {
    const res = await api.put(`/CompanyHoliday/${companyholidayId}`, data);
    return res.data
}

export const deleteCompanyHolidayAPI = async (companyholidayId: string) => {
    const res = await api.delete(`/CompanyHoliday/${companyholidayId}`);
    return res.data
}