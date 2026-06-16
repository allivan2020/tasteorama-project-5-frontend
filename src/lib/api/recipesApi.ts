import { nextServer } from './api';

export type Recipe = {
  _id: string;
  title: string;
  description: string;
  category: string;
  ingredients: string[];
  cookingTime: number;
  calories: number;
  image: string;
};

export type RecipesResponse = {
  recipes: Recipe[];
  totalPages: number;
  currentPage: number;
  totalRecipes: number;
};

export type RecipesParams = {
  page?: number;
  limit?: number;
  category?: string;
  ingredient?: string;
};

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
    image: r.image || getFallbackImage(i),
  }));

  return data;
};
