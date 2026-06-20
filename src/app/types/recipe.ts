interface Ingredient {
    id: string;
    measure: string;
}

export type Recipe = {
    _id: string;
    title: string;
    category: string;
    owner: string;
    area: string;
    instructions: string;
    description: string;
    thumb: string;
    time: string;
    ingredients: Ingredient[];
    calories?: number;
};

export type RecipesResponse = {
    page: number;
    perPage: number;
    totalRecipes: number;
    totalPages: number;
    recipes: Recipe[];
};

export type RecipesParams = {
    page?: number;
    perPage?: number;
    category?: string;
    ingredient?: string;
    search?: string;
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

export type RecipeDetailIngredient = {
  id?: string;
  name: string;
  measure?: string;
};