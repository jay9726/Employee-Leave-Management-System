import axios from "axios";

// const COMPANYHOLIDAY_BASE_URL = import.meta.env.VITE_COMPANYHOLIDAY_API_URL;
const COMPANYHOLIDAY_BASE_URL = "https://localhost:7287/api/CompanyHoliday";

export const getAllCompanyHolidaysAPI = async () => await axios.get(`${COMPANYHOLIDAY_BASE_URL}`);

export const getCompanyHolidayByIdAPI = async (companyholidayId: number) => await axios.get(`${COMPANYHOLIDAY_BASE_URL}/${companyholidayId}`);

export const addCompanyHolidayAPI = async (data: any) => await axios.post(`${COMPANYHOLIDAY_BASE_URL}`, data);

export const updateCompanyHolidayAPI = async (companyholidayId: number, data: any) => await axios.put(`${COMPANYHOLIDAY_BASE_URL}/${companyholidayId}`, data);

export const deleteCompanyHolidayAPI = async (companyholidayId: number) => await axios.delete(`${COMPANYHOLIDAY_BASE_URL}/${companyholidayId}`);