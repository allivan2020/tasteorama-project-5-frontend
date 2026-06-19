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

const MOCK_RECIPE_DETAILS: RecipeDetail[] = [
  {
    _id: '1',
    title: 'Classic French Omelette',
    description: 'A soft, creamy classic with butter and eggs.',
    category: 'Breakfast',
    area: 'French',
    instructions: [
      'Crack the eggs into a bowl, add salt and pepper, then whisk until smooth.',
      'Melt the butter in a non-stick skillet over medium heat.',
      'Pour in the eggs and gently stir until they begin to set.',
      'Fold the omelette, finish with herbs, and serve warm.',
    ],
    image: '/recipe-1.jpg',
    cookingTime: 10,
    ingredients: [
      { name: 'Eggs', measure: '3' },
      { name: 'Butter', measure: '1 tbsp' },
      { name: 'Chives', measure: 'to taste' },
    ],
    calories: 150,
  },
  {
    _id: '2',
    title: 'Pasta Carbonara',
    description: 'A classic Italian dish with bacon, Pecorino cheese, and eggs.',
    category: 'Main',
    area: 'Italian',
    instructions: [
      'Cook the pasta until al dente.',
      'Fry the bacon until crisp.',
      'Mix eggs with grated cheese, then combine with hot pasta off the heat.',
      'Season with black pepper and serve immediately.',
    ],
    image: '/recipe-2.jpg',
    cookingTime: 12,
    ingredients: [
      { name: 'Pasta', measure: '200 g' },
      { name: 'Bacon', measure: '100 g' },
      { name: 'Eggs', measure: '2' },
      { name: 'Pecorino', measure: '40 g' },
    ],
    calories: 200,
  },
  {
    _id: '3',
    title: 'Beef Burger',
    description: 'Juicy beef patty in a bun with vegetables and sauces.',
    category: 'Main',
    instructions: [
      'Shape the beef into a patty and season it.',
      'Cook the patty until browned and juicy.',
      'Toast the bun, add vegetables and sauce.',
      'Assemble the burger and serve warm.',
    ],
    image: '/recipe-3.jpg',
    cookingTime: 15,
    ingredients: [
      { name: 'Beef', measure: '150 g' },
      { name: 'Bun', measure: '1' },
      { name: 'Lettuce', measure: 'to taste' },
      { name: 'Tomato', measure: 'to taste' },
    ],
    calories: 300,
  },
  {
    _id: '4',
    title: 'Margherita Pizza',
    description: 'Traditional pizza with tomatoes, mozzarella, and basil.',
    category: 'Main',
    area: 'Italian',
    instructions: [
      'Spread tomato sauce over the dough.',
      'Add mozzarella and basil.',
      'Bake until the crust is golden and the cheese melts.',
      'Slice and serve hot.',
    ],
    image: '/recipe-4.jpg',
    cookingTime: 8,
    ingredients: [
      { name: 'Dough', measure: '1 base' },
      { name: 'Tomato', measure: '100 g' },
      { name: 'Mozzarella', measure: '120 g' },
      { name: 'Basil', measure: 'to taste' },
    ],
    calories: 250,
  },
  {
    _id: '5',
    title: 'Omelette with Mushrooms',
    description: 'A nutritious omelette with fresh mushrooms and herbs.',
    category: 'Breakfast',
    instructions: [
      'Slice and saute the mushrooms.',
      'Whisk the eggs with seasoning.',
      'Cook the eggs with mushrooms until softly set.',
      'Fold and garnish with herbs.',
    ],
    image: '/recipe-8.jpg',
    cookingTime: 6,
    ingredients: [
      { name: 'Eggs', measure: '3' },
      { name: 'Mushrooms', measure: '80 g' },
      { name: 'Herbs', measure: 'to taste' },
    ],
    calories: 150,
  },
  {
    _id: '6',
    title: 'Tom Yum Soup',
    description: 'Spicy Thai soup with shrimp and aromatic herbs.',
    category: 'Soup',
    area: 'Thai',
    instructions: [
      'Simmer aromatics in broth.',
      'Add shrimp and cook until tender.',
      'Season with chili, lime, and herbs.',
      'Serve hot.',
    ],
    image: '/recipe-7.jpg',
    cookingTime: 14,
    ingredients: [
      { name: 'Shrimp', measure: '150 g' },
      { name: 'Lemongrass', measure: '1 stalk' },
      { name: 'Chili', measure: 'to taste' },
      { name: 'Lime', measure: '1' },
    ],
    calories: 500,
  },
  {
    _id: '7',
    title: 'Philadelphia Sushi Roll',
    description: 'A refreshing blend of salmon, cream cheese, and avocado.',
    category: 'Sushi',
    instructions: [
      'Spread rice over the nori.',
      'Add salmon, cream cheese, and avocado.',
      'Roll tightly and slice into pieces.',
      'Serve with soy sauce.',
    ],
    image: '/recipe-6.jpg',
    cookingTime: 9,
    ingredients: [
      { name: 'Salmon', measure: '100 g' },
      { name: 'Cream cheese', measure: '50 g' },
      { name: 'Avocado', measure: '1/2' },
      { name: 'Rice', measure: '150 g' },
    ],
    calories: 300,
  },
  {
    _id: '8',
    title: 'Caesar Salad',
    description: 'Crispy romaine lettuce with croutons and parmesan.',
    category: 'Salad',
    instructions: [
      'Wash and chop the lettuce.',
      'Add croutons and parmesan.',
      'Toss with Caesar dressing.',
      'Serve chilled.',
    ],
    image: '/recipe-5.jpg',
    cookingTime: 5,
    ingredients: [
      { name: 'Lettuce', measure: '1 head' },
      { name: 'Croutons', measure: '40 g' },
      { name: 'Parmesan', measure: '30 g' },
      { name: 'Caesar dressing', measure: 'to taste' },
    ],
    calories: 180,
  },
  {
    _id: '9',
    title: 'Omelette with Goat Cheese',
    description: 'Creamy goat cheese and fresh spinach blend.',
    category: 'Breakfast',
    instructions: [
      'Whisk the eggs until smooth.',
      'Cook the eggs until softly set.',
      'Add goat cheese and spinach.',
      'Fold and serve warm.',
    ],
    image: '/recipe-9.jpg',
    cookingTime: 7,
    ingredients: [
      { name: 'Eggs', measure: '3' },
      { name: 'Goat cheese', measure: '40 g' },
      { name: 'Spinach', measure: '50 g' },
    ],
    calories: 200,
  },
  {
    _id: '10',
    title: 'Omelette with Smoked Salmon',
    description: 'Soft eggs with rich smoked salmon and fresh dill.',
    category: 'Breakfast',
    instructions: [
      'Whisk the eggs with seasoning.',
      'Cook gently until almost set.',
      'Add smoked salmon and dill.',
      'Fold the omelette and serve.',
    ],
    image: '/recipe-10.jpg',
    cookingTime: 5,
    ingredients: [
      { name: 'Eggs', measure: '3' },
      { name: 'Smoked salmon', measure: '60 g' },
      { name: 'Dill', measure: 'to taste' },
    ],
    calories: 180,
  },
  {
    _id: '11',
    title: 'Omelette with Ratatouille',
    description: 'Classic ratatouille vegetables in a soft omelette.',
    category: 'Breakfast',
    instructions: [
      'Cook the vegetables until tender.',
      'Whisk and season the eggs.',
      'Cook the eggs, then add the vegetables.',
      'Fold and serve warm.',
    ],
    image: '/recipe-11.jpg',
    cookingTime: 11,
    ingredients: [
      { name: 'Eggs', measure: '3' },
      { name: 'Zucchini', measure: '50 g' },
      { name: 'Eggplant', measure: '50 g' },
      { name: 'Pepper', measure: '50 g' },
    ],
    calories: 350,
  },
  {
    _id: '12',
    title: 'Omelette with Vegetables',
    description: 'Provencal flavors of peppers, tomatoes, and zucchini.',
    category: 'Breakfast',
    instructions: [
      'Chop the vegetables.',
      'Saute until lightly softened.',
      'Cook the whisked eggs with the vegetables.',
      'Fold and garnish before serving.',
    ],
    image: '/recipe-12.jpg',
    cookingTime: 10,
    ingredients: [
      { name: 'Eggs', measure: '3' },
      { name: 'Peppers', measure: '60 g' },
      { name: 'Tomatoes', measure: '60 g' },
      { name: 'Zucchini', measure: '60 g' },
    ],
    calories: 400,
  },
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

  if (process.env.BACKEND_URL) {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/recipes/${recipeId}`, {
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
