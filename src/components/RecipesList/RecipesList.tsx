'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getRecipes } from '@/lib/api/recipesApi';
import { RecipeCard } from '@/components/RecipeCard/RecipeCard';
import { LoadMoreBtn } from '@/components/LoadMoreBtn/LoadMoreBtn';
import styles from './RecipesList.module.css';

const LIMIT = 12;

export const RecipesList = () => {
  const [category, setCategory] = useState('');
  const [ingredient, setIngredient] = useState('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['recipes', category, ingredient],
      queryFn: ({ pageParam = 1 }) =>
        getRecipes({ page: pageParam, limit: LIMIT, category, ingredient }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.currentPage < lastPage.totalPages
          ? lastPage.currentPage + 1
          : undefined,
    });

  const recipes = data?.pages.flatMap((p) => p.recipes) ?? [];
  const totalRecipes = data?.pages[0]?.totalRecipes ?? 0;

  const handleResetFilters = () => {
    setCategory('');
    setIngredient('');
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleIngredientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIngredient(e.target.value);
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.heading}>
          <div className={styles.counter}>
            <h1 className={styles.title}>Recipes</h1>
            <p className={styles.total}>{totalRecipes} recipes</p>
          </div>

          <div className={styles.filters}>
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
            </select>
            <select
              value={ingredient}
              onChange={handleIngredientChange}
              className={styles.filterSelect}
            >
              <option value="">Ingredient</option>
            </select>
          </div>
        </div>

        <ul className={styles.list}>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </ul>

        {hasNextPage && (
          <LoadMoreBtn
            onClick={fetchNextPage}
            isLoading={isFetchingNextPage}
          />
        )}
      </div>
    </section>
  );
};
