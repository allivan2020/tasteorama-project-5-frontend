import { nextServer } from './api';
import {RecipeDetail, RecipesParams, RecipesResponse} from "@/app/types/recipe";

const FALLBACK_IMAGES = [
  '/recipe-1.jpg',
  '/recipe-2.jpg',
  '/recipe-3.jpg',
  '/recipe-4.jpg',
  '/recipe-5.jpg',
  '/recipe-6.jpg',
  '/recipe-7.jpg',
  '/recipe-8.jpg',
];

export function getFallbackImage(index: number): string {
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

export const getRecipes = async (
  params: RecipesParams = {},
): Promise<RecipesResponse> => {
  const { data } = await nextServer.get<RecipesResponse>('/recipes', {
    params,
  });

  data.recipes = data.recipes.map((r, i) => ({
    ...r,
    image: r.thumb || getFallbackImage(i),
  }));

  return data;
};

export const getOwnRecipes = async (
  params: Pick<RecipesParams, 'page' | 'perPage'> = {},
): Promise<RecipesResponse> => {
  const { data } = await nextServer.get<RecipesResponse>('/recipes/own', {
    params,
  });

  return data;
};

export const getRecipeById = async (
    recipeId: string,
): Promise<RecipeDetail> => {
  const { data } = await nextServer.get<RecipeDetail>(
      `/recipes/${recipeId}`,
  );

  return {
    ...data
  };
};