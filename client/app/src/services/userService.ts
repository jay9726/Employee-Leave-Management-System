import axios from "axios";

const USER_BASE_URL = import.meta.env.VITE_USER_API_URL;

export const getEmployeeCountAPI = async () => await axios.get(`${USER_BASE_URL}/userCount`);

export const getAllUsersAPI = async () => await axios.get(`${USER_BASE_URL}`);

export const getUserByIdAPI = async (id: number) => await axios.get(`${USER_BASE_URL}/${id}`);

export const addUserAPI = async (id: number, data: any) => await axios.post(`${USER_BASE_URL}/${id}`, data);

export const updateUserAPI = async (data: any) => await axios.post(`${USER_BASE_URL}`, data, {
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

export const deleteUserAPI = async (id: number) => await axios.delete(`${USER_BASE_URL}/${id}`);    