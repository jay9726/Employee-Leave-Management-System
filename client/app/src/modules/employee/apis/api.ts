import { api } from "@/lib/api";

export const getEmployeeCountAPI = async () => {
    const res = await api.get(`/User/userCount`);
    return res.data
}

export const getAllUsersAPI = async () => {
    const res = await api.get(`/User`);
    return res
}

export const getUserByIdAPI = async (id: string) => {
    const res = await api.get(`/User/${id}`);
    return res
}


export const addUserAPI = async (id: number, data: any) => {
    const res = await api.post(`/User/${id}`, data);
    return res.data
}

export const updateUserAPI = async (data: any) => {
    const res = await api.post(`/User`, data, { headers: { "Content-Type": "multipart/form-data" } });
    return res.data
}

export const deleteUserAPI = async (id: string) => {
    const res = await api.delete(`/User/${id}`);
    return res.data
}