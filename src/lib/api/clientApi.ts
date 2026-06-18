import { nextServer } from './api';
import { User } from '@/app/types/user';
import { Recipe } from '@/app/types/recipe';

export type UserRegisterProps = {
  email: string;
  password: string;
  username: string;
};

export type UserAuthDataProps = {
  email: string;
  password: string;
};


//  BACKEND LOGIN RETURNS:
//  { user: User }
 
type LoginResponse = {
  user: User;
};

type RegisterResponse = {
  newUser: User;
};

// LOGIN 
export const login = async (
  userData: UserAuthDataProps,
): Promise<LoginResponse> => {
  const { data } = await nextServer.post<LoginResponse>(
    '/auth/login',
    userData,
    { withCredentials: true },
  );

  return data;
};

// REGISTER 
export const register = async (
  data: UserRegisterProps,
): Promise<RegisterResponse> => {
  const { data: res } = await nextServer.post<RegisterResponse>(
    '/auth/register',
    data,
    { withCredentials: true },
  );

  return res;
};

// LOGOUT 
export const logout = async () => {
  const { data } = await nextServer.post(
    '/auth/logout',
    {},
    { withCredentials: true },
  );

  return data;
};

// PROFILE 
export const getProfile = async (): Promise<User> => {
  const { data } = await nextServer.get<User>(
    '/api/users/current',
    { withCredentials: true },
  );

  return data;
};

//  FAVORITES 
export const getFavoriteRecipes = async (): Promise<Recipe[]> => {
  const { data } = await nextServer.get<{ recipes: Recipe[] }>(
    '/recipes/favorites',
    { withCredentials: true },
  );

  return data.recipes;
};

//  REMOVE FAVORITE
export const removeFavoriteRecipe = async (recipeId: string) => {
  await nextServer.delete(
    `/recipes/favorites/${recipeId}`,
    { withCredentials: true },
  );
};

