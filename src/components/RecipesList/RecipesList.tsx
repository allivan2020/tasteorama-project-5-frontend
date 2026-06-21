"use client";

import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOwnRecipes, getRecipes } from "@/lib/api/recipesApi";
import { RecipeCard } from "@/components/RecipeCard/RecipeCard";
import { LoadMoreBtn } from "@/components/LoadMoreBtn/LoadMoreBtn";
import { Pagination } from "@/components/Pagination/Pagination";
import RecipesFilters from "../RecipesFilters/RecipesFilters";
import { useRecipesQueryParamsStore } from "@/lib/store/recipesQueryParamsStore";
import styles from "./RecipesList.module.css";
import { Recipe, RecipesResponse } from "@/app/types/recipe";
import NoRecipesResult from "../NoRecipesResult/NoRecipesResult";

const PER_PAGE = 12;
const PAGINATION_THRESHOLD = 4;

type Props = {
    recipeType?: "all" | "own";
};

export const RecipesList = ({ recipeType = "all" }: Props) => {
    const isOwnRecipes = recipeType === "own";
    const { category, ingredient, search } = useRecipesQueryParamsStore();
    const activeCategory = isOwnRecipes ? "" : category;
    const activeIngredient = isOwnRecipes ? "" : ingredient;
    const activeSearch = isOwnRecipes ? "" : search;
    const [page, setPage] = useState(1);
    const [reachedEnd, setReachedEnd] = useState(false);
    const queryClient = useQueryClient();

    const [prevFilters, setPrevFilters] = useState({
        category: activeCategory,
        ingredient: activeIngredient,
        search: activeSearch,
    });

    if (
        prevFilters.category !== activeCategory ||
        prevFilters.ingredient !== activeIngredient ||
        prevFilters.search !== activeSearch
    ) {
        setPrevFilters({
            category: activeCategory,
            ingredient: activeIngredient,
            search: activeSearch,
        });
        setPage(1);
        setReachedEnd(false);
    }

    const { data, isFetching, isSuccess, isError } = useQuery({
        queryKey: [
            isOwnRecipes ? "ownRecipes" : "recipes",
            page,
            activeCategory,
            activeIngredient,
            activeSearch,
        ],
        queryFn: () => {
            if (isOwnRecipes) {
                return getOwnRecipes({
                    page,
                    perPage: PER_PAGE,
                });
            }

            return getRecipes({
                page,
                perPage: PER_PAGE,
                category: activeCategory,
                ingredient: activeIngredient,
                search: activeSearch,
            });
        },
        placeholderData: isOwnRecipes
            ? (previousData) => previousData
            : undefined,
        staleTime: 60_000,
    });

    const totalRecipes = data?.totalRecipes ?? 0;
    const totalPages = data?.totalPages ?? 1;
    const usePagination =
        !isOwnRecipes && totalPages >= PAGINATION_THRESHOLD;
    const hasMore = page < totalPages;

    const displayRecipes = useMemo(() => {
        if (usePagination) return data?.recipes ?? [];

        const all: Recipe[] = [];
        for (let p = 1; p <= page; p++) {
            const cached = queryClient.getQueryData<RecipesResponse>([
                isOwnRecipes ? "ownRecipes" : "recipes",
                p,
                activeCategory,
                activeIngredient,
                activeSearch,
            ]);
            if (cached?.recipes) all.push(...cached.recipes);
        }
        return all;
    }, [
        data,
        page,
        activeCategory,
        activeIngredient,
        activeSearch,
        isOwnRecipes,
        usePagination,
        queryClient,
    ]);

    useEffect(() => {
        if (isSuccess && activeSearch && data?.recipes.length === 0) {
            toast.error(`No recipes found for "${activeSearch}"`);
        }
    }, [isSuccess, activeSearch, data]);

    useEffect(() => {
        if (isOwnRecipes && isError) {
            toast.error("Failed to load your recipes", {
                id: "own-recipes-error",
            });
        }
    }, [isOwnRecipes, isError]);

    const handleLoadMore = () => {
        if (hasMore) {
            setPage((p) => p + 1);
        } else {
            setReachedEnd(true);
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section
            className={`${styles.section} ${
                isOwnRecipes ? styles.profileSection : ""
            }`}
        >
            <div className={isOwnRecipes ? undefined : "container"}>
                <h2
                    className={`${styles.title} ${
                        isOwnRecipes ? styles.profileTitle : ""
                    }`}
                >
                    {isOwnRecipes ? `${totalRecipes} recipes` : "Recipes"}
                </h2>
                {!isOwnRecipes && (
                    <RecipesFilters totalRecipes={totalRecipes} />
                )}

                {isFetching && displayRecipes.length === 0 && (
                    <p className={styles.loading}>Loading...</p>
                )}

                <ul className={styles.list}>
                    {displayRecipes.map((recipe, index) => (
                        <RecipeCard
                            key={recipe._id}
                            recipe={recipe}
                            index={index}
                            showFavoriteButton={!isOwnRecipes}
                        />
                    ))}
                </ul>

                {totalRecipes === 0 && !isFetching && !isError && (
                    <NoRecipesResult />
                )}

                {isOwnRecipes && hasMore && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 40,
                        }}
                    >
                        <LoadMoreBtn
                            onClick={handleLoadMore}
                            isLoading={isFetching}
                        />
                    </div>
                )}

                {!isOwnRecipes && !usePagination && totalRecipes !== 0 && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginTop: 40,
                            gap: 12,
                        }}
                    >
                        {reachedEnd ? (
                            <p className={styles.noMore}>No more recipes</p>
                        ) : (
                            <LoadMoreBtn
                                onClick={handleLoadMore}
                                isLoading={isFetching}
                            />
                        )}
                    </div>
                )}

                {!isOwnRecipes && usePagination && totalPages > 1 && (
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
