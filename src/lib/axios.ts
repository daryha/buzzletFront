import axios from "axios";

export interface LoginResponse {
  accessToken: string;
}

export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  let token: string | null = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("accessToken");
  }

  if (token) {
    config.headers!["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
