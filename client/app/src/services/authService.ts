import axios from "axios";

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_API_URL;

export const loginAPI = async (data: any) =>
  await axios.post(`${AUTH_BASE_URL}/login`, data);

export const registerAPI = async (data: any) =>
  await axios.post(`${AUTH_BASE_URL}/register`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
