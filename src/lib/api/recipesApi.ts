import { nextServer } from './api';
import {RecipeDetail, RecipeDetailIngredient, RecipesParams, RecipesResponse} from "@/app/types/recipe";

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
  console.log('params',params);
  const { data } = await nextServer.get<RecipesResponse>('/recipes', {
    params,
  });

  data.recipes = data.recipes.map((r, i) => ({
    ...r,
    image: r.thumb || getFallbackImage(i),
  }));

  return data;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readText(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function readTextOrNumber(value: unknown): string | number | undefined {
  return typeof value === 'string' || typeof value === 'number'
    ? value
    : undefined;
}

function normalizeIngredient(value: unknown): RecipeDetailIngredient | null {
  if (typeof value === 'string') {
    return { name: value };
  }

  if (!isRecord(value)) {
    return null;
  }

  const nestedIngredient = value.ingredient;
  const nestedName = isRecord(nestedIngredient)
    ? readText(nestedIngredient.name) ?? readText(nestedIngredient.title)
    : readText(nestedIngredient);

  const name =
    readText(value.name) ??
    readText(value.title) ??
    nestedName ??
    readText(value.id) ??
    readText(value._id);

  if (!name) {
    return null;
  }

  const measure =
    readTextOrNumber(value.measure) ??
    readTextOrNumber(value.amount) ??
    readTextOrNumber(value.quantity) ??
    readTextOrNumber(value.unit);

  return {
    id: readText(value.id) ?? readText(value._id),
    name,
    measure: measure ? String(measure) : undefined,
  };
}

function normalizeInstructions(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((step) => {
        if (typeof step === 'string') {
          return step;
        }

        if (isRecord(step)) {
          return readText(step.text) ?? readText(step.step) ?? '';
        }

        return '';
      })
      .map((step) => step.trim())
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(/\r?\n/)
      .map((step) => step.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeRecipeDetail(value: unknown): RecipeDetail | null {
  const source =
    isRecord(value) && isRecord(value.recipe) ? value.recipe : value;

  if (!isRecord(source)) {
    return null;
  }

  const id = readText(source._id) ?? readText(source.id);
  const title = readText(source.title);

  if (!id || !title) {
    return null;
  }

  const ingredients = Array.isArray(source.ingredients)
    ? source.ingredients
        .map(normalizeIngredient)
        .filter(
          (ingredient): ingredient is RecipeDetailIngredient =>
            ingredient !== null,
        )
    : [];

  return {
    _id: id,
    title,
    description: readText(source.description) ?? '',
    category: readText(source.category) ?? '',
    owner: readText(source.owner),
    area: readText(source.area),
    instructions: normalizeInstructions(source.instructions),
    thumb: readText(source.thumb),
    image: readText(source.image),
    time: readTextOrNumber(source.time),
    cookingTime: readTextOrNumber(source.cookingTime),
    ingredients,
    calories: readTextOrNumber(source.calories) ?? null,
  };
}

export const getRecipeById = async (
  recipeId: string,
): Promise<RecipeDetail | null> => {
  if (!recipeId) {
    return null;
  }

  if (process.env.NEXT_PUBLIC_API_URL) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${recipeId}`, {
        next: { revalidate: 60 },
      });

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        return null;
      }

      return normalizeRecipeDetail(await response.json());
    } catch {
      return null;
    }
  }

  return MOCK_RECIPE_DETAILS.find((recipe) => recipe._id === recipeId) ?? null;
};
