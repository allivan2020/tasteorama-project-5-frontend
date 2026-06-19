'use client';

import { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getRecipes, Recipe, RecipesResponse } from '@/lib/api/recipesApi';
import { RecipeCard } from '@/components/RecipeCard/RecipeCard';
import { LoadMoreBtn } from '@/components/LoadMoreBtn/LoadMoreBtn';
import { Pagination } from '@/components/Pagination/Pagination';
import RecipesFilters from '../RecipesFilters/RecipesFilters';
import { useRecipesQueryParamsStore } from '@/lib/store/recipesQueryParamsStore';
import styles from './RecipesList.module.css';

const PER_PAGE = 4;
const PAGINATION_THRESHOLD = 4;

export const RecipesList = () => {
  const { category, ingredient } = useRecipesQueryParamsStore();
  const [page, setPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);
  const queryClient = useQueryClient();

  // Скидаємо сторінку при зміні фільтрів
  const [prevFilters, setPrevFilters] = useState({ category, ingredient });
  if (prevFilters.category !== category || prevFilters.ingredient !== ingredient) {
    setPrevFilters({ category, ingredient });
    setPage(1);
    setReachedEnd(false);
  }

  const { data, isFetching } = useQuery({
    queryKey: ['recipes', page, category, ingredient],
    queryFn: () =>
      getRecipes({ page, perPage: PER_PAGE, category, ingredient }),
    placeholderData: (prev) => prev,
    staleTime: 60_000,
  });

  const totalRecipes = data?.totalRecipes ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const usePagination = totalPages >= PAGINATION_THRESHOLD;
  const hasMore = page < totalPages;

  const displayRecipes = useMemo(() => {
    if (usePagination) return data?.recipes ?? [];

    const all: Recipe[] = [];
    for (let p = 1; p <= page; p++) {
      const cached = queryClient.getQueryData<RecipesResponse>(
        ['recipes', p, category, ingredient]
      );
      if (cached?.recipes) all.push(...cached.recipes);
    }
    return all;
  }, [data, page, category, ingredient, usePagination, queryClient]);

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((p) => p + 1);
    } else {
      setReachedEnd(true);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Recipes</h2>
        <RecipesFilters totalRecipes={totalRecipes} />

        {isFetching && displayRecipes.length === 0 && (
          <p className={styles.loading}>Loading...</p>
        )}

        <ul className={styles.list}>
          {displayRecipes.map((recipe, index) => (
            <RecipeCard key={recipe._id} recipe={recipe} index={index} />
          ))}
        </ul>

        {!usePagination && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40, gap: 12 }}>
            {reachedEnd ? (
              <p className={styles.noMore}>No more recipes</p>
            ) : (
              <LoadMoreBtn onClick={handleLoadMore} isLoading={isFetching} />
            )}
          </div>
        )}

        {usePagination && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};