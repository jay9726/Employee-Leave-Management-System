import { api } from "@/lib/api";


export const getDepartmentCountAPI = async () => {
    const res = await api.get('/Department/departmentCount');
    return res.data
}

export const getOnlyDepartmentAPI = async () => {
    const res = await api.get(`/Department/onlyDepartment`);
    return res.data
}

export const getAllDepartmentsAPI = async () => {
    const res = await api.get('/Department');
    return res.data
}

export const getDepartmentByIdAPI = async (departmentId: string) => {
    const res = await api.get(`/Department/${departmentId}`);
    return res.data
}

export const addDepartmentAPI = async (data: any) => {
    const res = await api.post(`/Department`, data);
    return res.data
}

export const updateDepartmentAPI = async (departmentId: string, data: any) => {
    const res = await api.put(`/Department/${departmentId}`, data);
    return res.data
}

export const deleteDepartmentAPI = async (departmentId: string) => {
    const res = await api.delete(`/Department/${departmentId}`);
    return res.data
}