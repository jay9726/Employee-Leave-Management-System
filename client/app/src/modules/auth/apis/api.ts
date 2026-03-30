import { api } from "@/lib/api";
import type { LoginSchemaPayload, RegisterSchemaPayload } from "../schemas/authSchema";


export const loginAPI = async (data: LoginSchemaPayload) => {
    const res = await api.post(`/auth/login`, data);
    return res;
}

export const registerAPI = async (data: RegisterSchemaPayload) => {
    const res = await api.post(`/auth/register`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
}

export const forgetPasswordAPI = async (data: any) => {
    const res = await api.post('/auth/forgot-password', data);
    return res.data;
}

export const resetPasswordAPI = async (data: any) => {
    const res = await api.post('/auth/reset-password', data);
    return res.data;
}

export const changePasswordAPI = async (data: any) => {
    const res = await api.post('/auth/change-password', data);
    return res;
}
