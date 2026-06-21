"use client";

import {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import BookmarkIcon from "@/assets/icons/Generic-bookmark-alternative.svg";
import {
    addFavoriteRecipe,
    getFavoriteRecipes,
    removeFavoriteRecipe,
} from "@/lib/api/clientApi";
import {useAuthStore} from "@/lib/store/authStore";
import {useAuthModalStore} from "@/lib/store/authModalStore";
import stylesCard from "@/components/RecipeCard/RecipeCard.module.css";
import TrashIcon from '@/assets/icons/trash.svg'
import {toast} from "react-hot-toast";
import {Oval} from "react-loader-spinner";

type Props = {
    recipeId: string;
};

export const FavoriteRecipeButton = ({recipeId}: Props) => {
    const queryClient = useQueryClient();

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const openModal = useAuthModalStore((state) => state.openModal);

    const [isHovered, setIsHovered] = useState(false);

    const {data} = useQuery({
        queryKey: ["favoriteRecipes"],
        queryFn: () => getFavoriteRecipes({page: 1, perPage: 10000}),
        enabled: isAuthenticated,
    });

    const isFavorite = data?.recipes?.some(
        (recipe) => recipe._id === recipeId
    ) ?? false;

    const mutation = useMutation({
        mutationFn: async () => {
            if (isFavorite) {
                await removeFavoriteRecipe(recipeId);
                return "removed";
            } else {
                await addFavoriteRecipe(recipeId);
                return "added";
            }
        },

        onSuccess: (action) => {
            queryClient.invalidateQueries({
                queryKey: ["favoriteRecipes"],
            });

            toast.success(
                action === "added"
                    ? "Recipe added to favorites ⭐"
                    : "Recipe removed from favorites 🗑️"
            );

        },
    });

    const handleClick = () => {
        if (!isAuthenticated) {
            openModal();
            return;
        }

        mutation.mutate();
    };

    return (
        <button
            type="button"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            onClick={handleClick}
            disabled={mutation.isPending}
            className={`
        ${stylesCard.favoriteButton}
        ${isFavorite ? stylesCard.isActive : ""}
        ${isFavorite && isHovered ? stylesCard.isDeleteHover : ""}
      `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {mutation.isPending ? (
                <Oval
                    height={24}
                    width={24}
                    color="#9b6c43"
                    secondaryColor="#3d2218"
                    strokeWidth={9}
                />
            ) : isFavorite && isHovered ? (
                <TrashIcon className={stylesCard.bookmarkIcon}/>
            ) : (
                <BookmarkIcon className={stylesCard.bookmarkIcon}/>
            )}
        </button>
    );
};
