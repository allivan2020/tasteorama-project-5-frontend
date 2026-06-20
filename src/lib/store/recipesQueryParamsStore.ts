import { create } from "zustand";
import { Category } from "@/app/types/categories";
import { Ingredient } from "@/app/types/ingredient";

type recipesQuryParamsStore = {
    category: Category["name"];
    ingredient: Ingredient["name"];
    search: string;
    setCategory: (category: Category["name"]) => void;
    setIngredient: (Ingredient: Ingredient["name"]) => void;
    setSearch: (search: string) => void;
    resetFilters: () => void;
};

export const useRecipesQueryParamsStore = create<recipesQuryParamsStore>(
    (set) => ({
        category: "",
        ingredient: "",
        search: "",
        setCategory: (category) => set({ category }),
        setIngredient: (ingredient) => set({ ingredient }),
        setSearch: (search) => set({ search }),
        resetFilters: () =>
            set({
                ingredient: "",
                category: "",
                search: "",
            }),
    }),
);
