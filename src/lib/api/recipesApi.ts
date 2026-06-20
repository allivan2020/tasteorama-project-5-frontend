import { nextServer } from './api';
import {RecipeDetail, RecipeDetailIngredient, RecipesParams, RecipesResponse} from "@/app/types/recipe";
import { Ingredient } from '@/app/types/ingredient';

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

function readEntityText(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value;
  }

  if (!isRecord(value)) {
    return undefined;
  }

  return (
    readText(value.name) ??
    readText(value.title) ??
    readText(value._id) ??
    readText(value.id)
  );
}

function readEntityId(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value;
  }

  if (!isRecord(value)) {
    return undefined;
  }

  return readText(value._id) ?? readText(value.id);
}

function unwrapRecipeDetail(value: unknown): unknown {
  let current = value;

  for (let index = 0; index < 3; index += 1) {
    if (!isRecord(current)) {
      return current;
    }

    const next =
      current.recipe ?? current.data ?? current.result ?? current.item;

    if (!isRecord(next)) {
      return current;
    }

    current = next;
  }

  return current;
}

function normalizeIngredient(value: unknown): RecipeDetailIngredient | null {
  if (typeof value === 'string') {
    return { name: value };
  }

  if (!isRecord(value)) {
    return null;
  }

  const nestedIngredient = value.ingredient ?? value.id;
  const nestedName = readEntityText(nestedIngredient);

  const name =
    readText(value.name) ??
    readText(value.title) ??
    nestedName;

  if (!name) {
    return null;
  }

  const measure =
    readTextOrNumber(value.measure) ??
    readTextOrNumber(value.amount) ??
    readTextOrNumber(value.quantity) ??
    readTextOrNumber(value.unit);

  return {
    id: readEntityId(nestedIngredient) ?? readEntityId(value),
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
  const source = unwrapRecipeDetail(value);

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
    category: readEntityText(source.category) ?? '',
    owner: readEntityText(source.owner),
    area: readEntityText(source.area),
    instructions: normalizeInstructions(source.instructions),
    thumb: readText(source.thumb),
    image: readText(source.image),
    time: readTextOrNumber(source.time),
    cookingTime: readTextOrNumber(source.cookingTime),
    ingredients,
    calories: readTextOrNumber(source.calories) ?? null,
  };
}

async function getIngredientsById(
  backendUrl: string,
): Promise<Map<string, string>> {
  const response = await fetch(`${backendUrl}/ingredients`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return new Map();
  }

  const ingredients = (await response.json()) as Ingredient[];

  return new Map(
    ingredients.map((ingredient) => [ingredient._id, ingredient.name]),
  );
}

function resolveIngredientNames(
  recipe: RecipeDetail,
  ingredientsById: Map<string, string>,
): RecipeDetail {
  return {
    ...recipe,
    ingredients: recipe.ingredients.map((ingredient) => ({
      ...ingredient,
      name:
        ingredient.id && ingredientsById.has(ingredient.id)
          ? ingredientsById.get(ingredient.id) ?? ingredient.name
          : ingredient.name,
    })),
  };
}

export const getRecipeById = async (
  recipeId: string,
): Promise<RecipeDetail | null> => {
  if (!recipeId) {
    return null;
  }

  const backendUrl = process.env.BACKEND_URL?.trim().replace(/\/$/, '');

  if (!backendUrl) {
    return null;
  }

  try {
    const response = await fetch(
      `${backendUrl}/recipes/${encodeURIComponent(recipeId)}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      return null;
    }

    const recipe = normalizeRecipeDetail(await response.json());

    if (!recipe) {
      return null;
    }

    const ingredientsById = await getIngredientsById(backendUrl);

    return resolveIngredientNames(recipe, ingredientsById);
  } catch {
    return null;
  }
};
