import { nextServer } from './api';
import { User } from '@/app/types/user';
import {Recipe} from "@/app/types/recipe";


export type UserRegisterProps = {
  email: string;
  password: string;
  username: string;
};

export type UserAuthDataProps = {
  email: string;
  password: string;
};

type RegisterResponse = {
  newUser: User;
};

export const login = async (userData: UserAuthDataProps): Promise<User> => {
  const { data } = await nextServer.post<User>('/auth/login', userData);
  return data;
};

export const register = async (
  data: UserRegisterProps,
): Promise<RegisterResponse> => {
  const res = await nextServer.post('/auth/register', data);
  return res.data;
};

export const logout = async () => {
  const res = await nextServer.post(
    '/auth/logout',
    {},
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const getProfile = async (): Promise<User> => {
  const res = await nextServer.get("api/profile", {
    withCredentials: true,
  });

  return res.data?.user;
};


export const getFavoriteRecipes = async () => {
  const { data } = await nextServer.get<{ recipes: Recipe[] }>(
      '/recipes/favorites',
      { withCredentials: true },
  );
  return data.recipes;
};

export const removeFavoriteRecipe = async (recipeId: string) => {
  await nextServer.delete(`/recipes/favorites/${recipeId}`, {
    withCredentials: true,
  });
};