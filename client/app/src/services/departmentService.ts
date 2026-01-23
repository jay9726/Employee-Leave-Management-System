import axios from "axios";

const DEPARTMENT_BASE_URL = import.meta.env.VITE_DEPARTMENT_API_URL;


export const getDepartmentCountAPI = async () => await axios.get(`${DEPARTMENT_BASE_URL}/departmentCount`);

export const getOnlyDepartmentAPI = async () => await axios.get(`${DEPARTMENT_BASE_URL}/onlyDepartment`);

export const getAllDepartmentsAPI = async (page:number) => await axios.get(`${DEPARTMENT_BASE_URL}/?page=${page}`);

export const getDepartmentByIdAPI = async (departmentId: number) => await axios.get(`${DEPARTMENT_BASE_URL}/${departmentId}`);

export const addDepartmentAPI = async (data: any) => await axios.post(`${DEPARTMENT_BASE_URL}`, data);

export const updateDepartmentAPI = async (departmentId: number, data: any) => await axios.put(`${DEPARTMENT_BASE_URL}/${departmentId}`, data);

export const deleteDepartmentAPI = async (departmentId: number) => await axios.delete(`${DEPARTMENT_BASE_URL}/${departmentId}`);