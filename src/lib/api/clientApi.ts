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

export type UserRegisterProps = {
  email: string;
  password: string;
  username: string;
};

type RegisterResponse = {
  newUser: User;
};

export const login = async (userData: UserAuthDataProps): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/login", userData);
  return data;
};

export const register = async (data: UserRegisterProps): Promise<RegisterResponse> => {
  const res = await nextServer.post('/auth/register', data);
  return res.data;
};