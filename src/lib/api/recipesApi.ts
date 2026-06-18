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

export type RecipeDetailIngredient = {
  id?: string;
  name: string;
  measure?: string;
};

export type RecipeDetail = {
  _id: string;
  title: string;
  description: string;
  category: string;
  owner?: string;
  area?: string;
  instructions: string[];
  thumb?: string;
  image?: string;
  time?: string | number;
  cookingTime?: string | number;
  ingredients: RecipeDetailIngredient[];
  calories?: string | number | null;
};

export type RecipesResponse = {
  recipes: Recipe[];
  totalPages: number;
  currentPage: number;
  totalRecipes: number;
};

export type RecipesParams = {
  page?: number;
  perPage?: number;
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

const MOCK_RECIPE_DETAILS: RecipeDetail[] = [
  {
    _id: '1',
    title: 'French Omelette',
    description:
      'A French omelette is known for its soft, tender texture and lack of browning on the outside. It is simple but requires a bit of attention to achieve the perfect consistency. It is ideal for a light yet satisfying breakfast.',
    category: 'Breakfast',
    area: 'French',
    instructions: [
      'Crack the eggs into a small bowl. Add a pinch of salt and a bit of black pepper. Whisk the eggs with a fork or whisk until smooth and slightly foamy.',
      'Place a small non-stick skillet over medium heat and add the butter. Let the butter melt completely, being careful not to let it brown.',
      'Pour the beaten eggs into the skillet. Allow them to set slightly around the edges, then gently stir the eggs, folding them toward the center to keep the omelette soft and tender.',
      'When the omelette is almost set but still slightly soft in the center, gently lift one side with a spatula and fold it in half. The omelette should remain light and creamy.',
      'Transfer the omelette to a plate, sprinkle with fresh herbs if desired, and serve immediately while it is warm and tender.',
    ],
    image: '/recipe-1.jpg',
    time: '5-7 minutes',
    cookingTime: 7,
    calories: 'Approximately 200 kcal per serving',
    ingredients: [
      { name: 'Eggs', measure: '3' },
      { name: 'Butter', measure: '1 tbsp (about 15 g)' },
      { name: 'Salt', measure: 'a pinch' },
      { name: 'Black pepper', measure: 'to taste' },
      {
        name: 'Fresh herbs (parsley, dill, or green onions)',
        measure: 'for garnish (optional)',
      },
    ],
  },
  {
    _id: '2',
    title: 'Pasta Carbonara',
    description: 'A classic Italian dish with bacon, Pecorino cheese, and eggs.',
    category: 'Main',
    area: 'Italian',
    instructions: [
      'Cook the pasta until al dente, reserving a little pasta water before draining.',
      'Fry the bacon until golden and crisp.',
      'Whisk eggs with grated cheese, then combine with hot pasta away from direct heat.',
      'Loosen the sauce with pasta water and serve immediately.',
    ],
    image: '/recipe-2.jpg',
    time: '12 minutes',
    cookingTime: 12,
    calories: 200,
    ingredients: [
      { name: 'Pasta', measure: '200 g' },
      { name: 'Bacon', measure: '80 g' },
      { name: 'Eggs', measure: '2' },
      { name: 'Pecorino', measure: '40 g' },
    ],
  },
  {
    _id: '3',
    title: 'Beef Burger',
    description: 'Juicy beef patty in a bun with vegetables and sauces.',
    category: 'Main',
    area: 'American',
    instructions: [
      'Shape the beef into patties and season with salt and pepper.',
      'Cook the patties until browned and cooked through.',
      'Toast the buns, then add vegetables, sauce, and the patty.',
      'Serve warm.',
    ],
    image: '/recipe-3.jpg',
    time: '15 minutes',
    cookingTime: 15,
    calories: 300,
    ingredients: [
      { name: 'Beef', measure: '200 g' },
      { name: 'Bun', measure: '1' },
      { name: 'Lettuce', measure: 'to taste' },
      { name: 'Tomato', measure: '2 slices' },
    ],
  },
  {
    _id: '4',
    title: 'Margherita Pizza',
    description: 'Traditional pizza with tomatoes, mozzarella, and basil.',
    category: 'Main',
    area: 'Italian',
    instructions: [
      'Spread tomato sauce over the dough.',
      'Add mozzarella and bake until the crust is golden.',
      'Finish with fresh basil before serving.',
    ],
    image: '/recipe-4.jpg',
    time: '8 minutes',
    cookingTime: 8,
    calories: 250,
    ingredients: [
      { name: 'Dough', measure: '1 base' },
      { name: 'Tomato', measure: '3 tbsp sauce' },
      { name: 'Mozzarella', measure: '100 g' },
      { name: 'Basil', measure: 'to taste' },
    ],
  },
  {
    _id: '5',
    title: 'Omelette with Mushrooms',
    description: 'A nutritious omelette with fresh mushrooms and herbs.',
    category: 'Breakfast',
    area: 'French',
    instructions: [
      'Slice the mushrooms and cook them until soft.',
      'Whisk the eggs with salt and pepper.',
      'Pour the eggs into the pan and add mushrooms before folding.',
    ],
    image: '/recipe-8.jpg',
    time: '6 minutes',
    cookingTime: 6,
    calories: 150,
    ingredients: [
      { name: 'Eggs', measure: '3' },
      { name: 'Mushrooms', measure: '80 g' },
      { name: 'Herbs', measure: 'to taste' },
    ],
  },
  {
    _id: '6',
    title: 'Tom Yum Soup',
    description: 'Spicy Thai soup with shrimp and aromatic herbs.',
    category: 'Soup',
    area: 'Thai',
    instructions: [
      'Simmer lemongrass, chili, and lime leaves in broth.',
      'Add shrimp and cook until pink.',
      'Season with lime juice and serve hot.',
    ],
    image: '/recipe-7.jpg',
    time: '14 minutes',
    cookingTime: 14,
    calories: 500,
    ingredients: [
      { name: 'Shrimp', measure: '150 g' },
      { name: 'Lemongrass', measure: '1 stalk' },
      { name: 'Chili', measure: 'to taste' },
      { name: 'Lime', measure: '1' },
    ],
  },
  {
    _id: '7',
    title: 'Philadelphia Sushi Roll',
    description: 'A refreshing blend of salmon, cream cheese, and avocado.',
    category: 'Sushi',
    area: 'Japanese',
    instructions: [
      'Spread rice over the nori sheet.',
      'Add salmon, cream cheese, and avocado.',
      'Roll tightly, slice, and serve.',
    ],
    image: '/recipe-6.jpg',
    time: '9 minutes',
    cookingTime: 9,
    calories: 300,
    ingredients: [
      { name: 'Salmon', measure: '80 g' },
      { name: 'Cream cheese', measure: '40 g' },
      { name: 'Avocado', measure: '1/2' },
      { name: 'Rice', measure: '120 g' },
    ],
  },
  {
    _id: '8',
    title: 'Caesar Salad',
    description: 'Crispy romaine lettuce with croutons and parmesan.',
    category: 'Salad',
    area: 'American',
    instructions: [
      'Tear the lettuce into bite-sized pieces.',
      'Add croutons, parmesan, and dressing.',
      'Toss gently and serve right away.',
    ],
    image: '/recipe-5.jpg',
    time: '5 minutes',
    cookingTime: 5,
    calories: 180,
    ingredients: [
      { name: 'Lettuce', measure: '1 head' },
      { name: 'Croutons', measure: '40 g' },
      { name: 'Parmesan', measure: '30 g' },
      { name: 'Caesar dressing', measure: 'to taste' },
    ],
  },
  {
    _id: '9',
    title: 'Omelette with Goat Cheese',
    description: 'Creamy goat cheese and fresh spinach blend.',
    category: 'Breakfast',
    area: 'French',
    instructions: [
      'Whisk the eggs until smooth.',
      'Cook gently in butter and add spinach and goat cheese.',
      'Fold the omelette and serve warm.',
    ],
    image: '/recipe-9.jpg',
    time: '7 minutes',
    cookingTime: 7,
    calories: 200,
    ingredients: [
      { name: 'Eggs', measure: '3' },
      { name: 'Goat cheese', measure: '40 g' },
      { name: 'Spinach', measure: 'a handful' },
    ],
  },
  {
    _id: '10',
    title: 'Omelette with Smoked Salmon',
    description: 'Soft eggs with rich smoked salmon and fresh dill.',
    category: 'Breakfast',
    area: 'French',
    instructions: [
      'Prepare a soft omelette base.',
      'Add smoked salmon and dill before folding.',
      'Serve immediately while warm.',
    ],
    image: '/recipe-10.jpg',
    time: '5 minutes',
    cookingTime: 5,
    calories: 180,
    ingredients: [
      { name: 'Eggs', measure: '3' },
      { name: 'Smoked salmon', measure: '60 g' },
      { name: 'Dill', measure: 'to taste' },
    ],
  },
  {
    _id: '11',
    title: 'Omelette with Ratatouille',
    description: 'Classic ratatouille vegetables in a soft omelette.',
    category: 'Breakfast',
    area: 'French',
    instructions: [
      'Warm the ratatouille vegetables in a pan.',
      'Cook the eggs gently until just set.',
      'Add vegetables, fold, and serve.',
    ],
    image: '/recipe-11.jpg',
    time: '11 minutes',
    cookingTime: 11,
    calories: 350,
    ingredients: [
      { name: 'Eggs', measure: '3' },
      { name: 'Zucchini', measure: '40 g' },
      { name: 'Eggplant', measure: '40 g' },
      { name: 'Pepper', measure: '40 g' },
    ],
  },
  {
    _id: '12',
    title: 'Omelette with Vegetables',
    description: 'Provencal flavors of peppers, tomatoes, and zucchini.',
    category: 'Breakfast',
    area: 'French',
    instructions: [
      'Dice the vegetables and cook until tender.',
      'Whisk the eggs and pour them into the pan.',
      'Add vegetables, fold, and serve warm.',
    ],
    image: '/recipe-12.jpg',
    time: '10 minutes',
    cookingTime: 10,
    calories: 400,
    ingredients: [
      { name: 'Eggs', measure: '3' },
      { name: 'Peppers', measure: '50 g' },
      { name: 'Tomatoes', measure: '50 g' },
      { name: 'Zucchini', measure: '50 g' },
    ],
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
    image: r.image || getFallbackImage(i),
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
