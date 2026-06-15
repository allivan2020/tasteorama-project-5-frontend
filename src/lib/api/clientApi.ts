import { api } from "./api";
import { User } from "@/app/types/user";

export const login = async (data: {
  email: string;
  password: string;
}): Promise<User> => {
  const res = await api.post("/auth/login", data, {
    withCredentials: true,
  });

  return res.data?.user;
};

export const register = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/register", data, {
    withCredentials: true,
  });

  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout", {}, {
    withCredentials: true,
  });

  return res.data;
};

export const getProfile = async (): Promise<User> => {
  const res = await api.get("/profile", {
    withCredentials: true,
  });

  return res.data;
};