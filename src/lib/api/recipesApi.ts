import { nextServer } from './api';
import {RecipeDetail, RecipesParams, RecipesResponse} from "@/app/types/recipe";
import type { Category } from '@/app/types/categories';

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

const resolveCategoryName = async (category: string): Promise<string> => {
  if (!category || !/^[a-f\d]{24}$/i.test(category)) {
    return category;
  }

  try {
    const { data } = await nextServer.get<Category[]>('/categories');
    const foundCategory = data.find((item) => item._id === category);

    return foundCategory?.name ?? category;
  } catch {
    return category;
  }
};

export const getRecipeById = async (
    recipeId: string,
): Promise<RecipeDetail> => {
  const { data } = await nextServer.get<RecipeDetail>(
      `/recipes/${recipeId}`,
  );
  const category = await resolveCategoryName(data.category);

  return {
    ...data,
    category,
  };
};

export const deleteRecipe = async (recipeId: string) => {
  const { data } = await nextServer.delete(`/recipes/${recipeId}`);
  return data;
};
