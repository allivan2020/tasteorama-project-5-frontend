'use client';

import FilterIcon from "@/assets/icons/Mail-filter.svg";
import FilterCloseIcon from "@/assets/icons/Mail-filter-clossed.svg";
import styles from "./RecipesFilters.module.css";
import { getCategories, getIngredients } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRecipesQueryParamsStore } from "@/lib/store/recipesQueryParamsStore";

interface RecipesFiltersProps {
    totalRecipes: number;
};

const RecipesFilters = ({ totalRecipes}: RecipesFiltersProps) => {
    const {category, ingredient, setCategory, setIngredient, resetFilters } = useRecipesQueryParamsStore()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
        select: (data) => [...data].sort((a, b) => a.name.localeCompare(b.name)),
    });

    const { data: ingredients} = useQuery({
        queryKey: ['ingredients'],
        queryFn: () => getIngredients(),
        select: (data) => [...data].sort((a, b) => a.name.localeCompare(b.name)),
    });

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const handleIngredientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setIngredient(event.target.value);
    }

    const handleResetFilters = () => {
        resetFilters();
    }
    
    return (
        <div className={styles.filters}>
            <p className={styles.countRecipes}>{totalRecipes} recipes</p>
            <div className={styles.mobileFilters}>
                <button
                    className={styles.filterButton}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    type="button"
                >
                    <span className={styles.filterSpan}>Filters</span>
                    {isMobileMenuOpen ? <FilterCloseIcon className={`icon ${styles.filterIcon}`} /> : <FilterIcon className={`icon ${styles.filterIcon}`}/>}
                </button>
                {isMobileMenuOpen && (
                    <div className={styles.mobileFiltersDiv}>
                        <select
                            value={category}
                            onChange={handleCategoryChange}
                            className={styles.mobileFilterSelect}
                        >
                            <option value="">Category</option>
                            {categories && categories.map((category) => {
                                return (
                                    <option key={category._id} value={category.name}>{category.name}</option>
                                );
                            })}
                        </select>
                        <select
                            value={ingredient}
                            onChange={handleIngredientChange}
                            className={styles.mobileFilterSelect}
                        >
                            <option value="">Ingredient</option>
                            {ingredients && ingredients.map((ingredient) => {
                                return (
                                    <option key={ingredient._id} value={ingredient.name}>{ingredient.name}</option>
                                );
                            })}
                        </select>
                        <button
                            type="button"
                            onClick={handleResetFilters}
                            className={styles.mobileResetButton}
                        >
                            Reset filters
                        </button>
                    </div>
                )}
            </div>
            <div className={styles.desktopFilters}>
                <button
                    type="button"
                    onClick={handleResetFilters}
                    className={styles.resetButton}
                >
                    Reset filters
                </button>
                <select
                    value={category}
                    onChange={handleCategoryChange}
                    className={styles.filterSelect}
                >
                    <option value="">Category</option>
                    {categories && categories.map((category) => {
                        return (
                            <option key={category._id} value={category.name}>{category.name}</option>
                        );
                    })}
                </select>
                <select
                    value={ingredient}
                    onChange={handleIngredientChange}
                    className={styles.filterSelect}
                >
                    <option value="">Ingredient</option>
                    {ingredients && ingredients.map((ingredient) => {
                        return (
                            <option key={ingredient._id} value={ingredient.name}>{ingredient.name}</option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

export default RecipesFilters;