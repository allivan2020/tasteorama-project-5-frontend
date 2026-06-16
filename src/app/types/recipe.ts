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
    calories: number;
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