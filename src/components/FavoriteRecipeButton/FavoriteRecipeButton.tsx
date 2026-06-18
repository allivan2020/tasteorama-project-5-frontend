"use client";

import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import BookmarkIcon from "@/assets/icons/Generic-bookmark-alternative.svg";

import {
  addFavoriteRecipe,
  getFavoriteRecipes,
  removeFavoriteRecipe,
} from "@/lib/api/clientApi";

import { useAuthStore } from "@/lib/store/authStore";
import { useAuthModalStore } from "@/lib/store/authModalStore";

import stylesCard from "@/components/RecipeCard/RecipeCard.module.css";

type Props = {
  recipeId: string;
};

export const FavoriteRecipeButton = ({ recipeId }: Props) => {
  const queryClient = useQueryClient();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const openModal = useAuthModalStore((state) => state.openModal);

  const { data: favorites = [] } = useQuery({
    queryKey: ["favoriteRecipes"],
    queryFn: getFavoriteRecipes,
    enabled: isAuthenticated,
  });

  const isFavorite = useMemo(
    () => favorites.some((recipe) => recipe._id === recipeId),
    [favorites, recipeId],
  );

  const mutation = useMutation({
    mutationFn: async () => {
      if (isFavorite) {
        await removeFavoriteRecipe(recipeId);
      } else {
        await addFavoriteRecipe(recipeId);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favoriteRecipes"],
      });
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
      `}
    >
      {mutation.isPending ? (
        "..."
      ) : (
        <BookmarkIcon className={stylesCard.bookmarkIcon} />
      )}
    </button>
  );
};
