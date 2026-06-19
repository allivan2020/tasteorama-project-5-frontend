import { nextServer } from './api';
import { User } from '@/app/types/user';
import { Recipe } from '@/app/types/recipe';
import { Category } from '@/app/types/categories';
import { Ingredient } from '@/app/types/ingredient';
import { useAuthStore } from "@/lib/store/authStore";

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

type LoginResponse = {
  user: User;
};

export const login = async (userData: UserAuthDataProps) => {
  const { data } = await nextServer.post<LoginResponse>(
    "/auth/login",
    userData
  );

  //  беремо саме user
  useAuthStore.getState().setUser(data.user);

  return data.user;
};

export const register = async (
  data: UserRegisterProps,
): Promise<RegisterResponse> => {
  const res = await nextServer.post("/auth/register", data);
  return res.data;
};

export const logout = async () => {
  const res = await nextServer.post(
    "/auth/logout",
    {},
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const getProfile = async (): Promise<User> => {
  const { data } = await nextServer.get<User>(
    '/users/current',
    { withCredentials: true },
  );

  return data;
};

export const getFavoriteRecipes = async ( category?: string, ingredient?: string) => {
  const { data } = await nextServer.get<{ recipes: Recipe[] }>(
    '/recipes/favorites',
    {
        params: {
            category,
            ingredient,
        },
        withCredentials: true },
  );
  return data.recipes;
};

export const addFavoriteRecipe = async (recipeId: string) => {
  const { data } = await nextServer.post(
    `/recipes/favorites/${recipeId}`,
    {},
    {
      withCredentials: true,
    },
  );

  return data;
};

export const removeFavoriteRecipe = async (recipeId: string) => {
  await nextServer.delete(`/recipes/favorites/${recipeId}`, {
    withCredentials: true,
  });
};


export const getCategories = async (): Promise<Category[]> => {
  const res = await nextServer.get<Category[]>('/categories');
  return res.data;
};

export const getIngredients = async (): Promise<Ingredient[]> => {
  const res = await nextServer.get<Ingredient[]>('/ingredients');
  return res.data;
}