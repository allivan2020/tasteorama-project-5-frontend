'use client'
import {useQuery} from "@tanstack/react-query";
import {getFavoriteRecipes} from "@/lib/api/clientApi";
import {RecipeCard} from "@/components/RecipeCard/RecipeCard";
import css from './SavedRecipes.module.css'
import {Oval} from "react-loader-spinner";
import RecipesFilters from "@/components/RecipesFilters/RecipesFilters";
import {useRecipesQueryParamsStore} from "@/lib/store/recipesQueryParamsStore";

export const SavedRecipes = () => {
    const {category, ingredient} = useRecipesQueryParamsStore();

    const {data = [], isLoading} = useQuery({
        queryKey: ['favoriteRecipes', category, ingredient],
        queryFn: () =>
            getFavoriteRecipes(
                category,
                ingredient
            ),
    })

    if (isLoading) {
        return (
            <div className={css.loaderWrapper}>
                <Oval
                    height={40}
                    width={40}
                    color="#9b6c43"
                    secondaryColor="#3d2218"
                    strokeWidth={9}
                />
            </div>
        );
    }

    return (
        <>
            <RecipesFilters totalRecipes={data.length}/>
            <ul className={css.list}>
                {data.map((recipe, index) => (
                    <RecipeCard
                        key={recipe._id}
                        recipe={recipe}
                        index={index}
                    />
                ))}
            </ul>
        </>
    )
}