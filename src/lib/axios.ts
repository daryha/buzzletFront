import axios from "axios";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
