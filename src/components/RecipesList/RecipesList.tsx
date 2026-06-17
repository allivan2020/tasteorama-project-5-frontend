'use client';

import {useState} from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getRecipes} from '@/lib/api/recipesApi';
import {RecipeCard} from '@/components/RecipeCard/RecipeCard';
import {LoadMoreBtn} from '@/components/LoadMoreBtn/LoadMoreBtn';
import {Pagination} from '@/components/Pagination/Pagination';
import styles from './RecipesList.module.css';

const LIMIT = 12;
const PAGINATION_THRESHOLD = 4; // показуємо пагінацію замість Load More від 4 сторінок

export const RecipesList = () => {
    const [category, setCategory] = useState('');
    const [ingredient, setIngredient] = useState('');

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
            lastPage.currentPage < lastPage.totalPages
                ? lastPage.currentPage + 1
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
                            <option value="Breakfast">Breakfast</option>
                            <option value="Main">Main</option>
                            <option value="Soup">Soup</option>
                            <option value="Salad">Salad</option>
                            <option value="Sushi">Sushi</option>
                        </select>
                        <select
                            value={ingredient}
                            onChange={handleIngredientChange}
                            className={styles.filterSelect}
                        >
                            <option value="">Ingredient</option>
                            <option value="eggs">Eggs</option>
                            <option value="salmon">Salmon</option>
                            <option value="tomato">Tomato</option>
                            <option value="mushrooms">Mushrooms</option>
                        </select>
                    </div>
                </div>

                {isFetching && !isFetchingNextPage && recipes.length === 0 && (
                    <p className={styles.loading}>Loading...</p>
                )}

                <ul className={styles.list}>
                    {recipes.map((recipe, index) => (
                        <RecipeCard key={recipe._id} recipe={recipe} index={index}/>
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
