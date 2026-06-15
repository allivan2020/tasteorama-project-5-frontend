import { User } from "@/app/types/user";
import { nextServer } from "./api";

interface UserAuthDataProps {
  email: string;
  password: string;
}

export type UserRegisterProps = {
  email: string;
  password: string;
  username: string;
};

export const login = async (userData: UserAuthDataProps): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/login", userData);
  return data;
};

export const register = async (data: UserRegisterProps): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};