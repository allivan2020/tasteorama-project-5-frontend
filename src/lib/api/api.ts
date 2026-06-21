import axios from 'axios';
import { useAuthStore } from "@/lib/store/authStore";

export const nextServer = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

nextServer.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
    }
    return Promise.reject(error);
  }
);