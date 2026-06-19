'use client';

import {useInfiniteQuery} from '@tanstack/react-query';
import {getRecipes} from '@/lib/api/recipesApi';
import {RecipeCard} from '@/components/RecipeCard/RecipeCard';
import {LoadMoreBtn} from '@/components/LoadMoreBtn/LoadMoreBtn';
import {Pagination} from '@/components/Pagination/Pagination';
import styles from './RecipesList.module.css';
import RecipesFilters from '../RecipesFilters/RecipesFilters';
import { useRecipesQueryParamsStore } from '@/lib/store/recipesQueryParamsStore';

const LIMIT = 12;
const PAGINATION_THRESHOLD = 4; // показуємо пагінацію замість Load More від 4 сторінок

export const RecipesList = () => {
    const { category, ingredient } = useRecipesQueryParamsStore();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching,
    } = useInfiniteQuery({
        queryKey: ['recipes', category, ingredient],
        queryFn: ({pageParam = 1}) =>
            getRecipes({page: pageParam, perPage: LIMIT, category, ingredient}),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.page < lastPage.totalPages
                ? lastPage.page + 1
                : undefined,
    });

    const recipes = data?.pages.flatMap((p) => p.recipes) ?? [];
    const totalRecipes = data?.pages[0]?.totalRecipes ?? 0;
    const totalPages = data?.pages[0]?.totalPages ?? 1;
    const currentPage = data?.pages.length ?? 1;
    const usePagination = totalPages >= PAGINATION_THRESHOLD;

    const handlePageChange = (page: number) => {
        if (page > currentPage) {
            fetchNextPage();
        }
    };

    

    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.title}>Recipes</h2>    
                <RecipesFilters totalRecipes={totalRecipes} />

                {isFetching && !isFetchingNextPage && recipes.length === 0 && (
                    <p className={styles.loading}>Loading...</p>
                )}

                <ul className={styles.list}>
                    {recipes.map((recipe, index) => (
                        <RecipeCard key={recipe._id} recipe={recipe} index={index} />
                    ))}
                </ul>

                {hasNextPage && !usePagination && (
                    <LoadMoreBtn
                        onClick={fetchNextPage}
                        isLoading={isFetchingNextPage}
                    />
                )}

                {usePagination && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </section>
    );
};
