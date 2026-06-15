import { User } from "@/app/types/user";
import { nextServer } from "./api";

interface UserAuthDataProps {
  email: string;
  password: string;
}

export const login = async (userData: UserAuthDataProps): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/login", userData);
  return data;
};
