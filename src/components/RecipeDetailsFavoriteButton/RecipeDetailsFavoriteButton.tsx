'use client';

import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import BookmarkIcon from '@/assets/icons/Generic-bookmark-alternative.svg';
import BookmarkSavedIcon from '@/assets/icons/Generic-bookmark.svg';
import {
  addFavoriteRecipe,
  getFavoriteRecipes,
  removeFavoriteRecipe,
} from '@/lib/api/clientApi';
import { useAuthModalStore } from '@/lib/store/authModalStore';
import { useAuthStore } from '@/lib/store/authStore';

import styles from './RecipeDetailsFavoriteButton.module.css';

type RecipeDetailsFavoriteButtonProps = {
  recipeId: string;
};

export function RecipeDetailsFavoriteButton({
  recipeId,
}: RecipeDetailsFavoriteButtonProps) {
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const openModal = useAuthModalStore((state) => state.openModal);
  const [savedOverride, setSavedOverride] = useState<boolean | null>(null);

  const { data: favorites = [] } = useQuery({
    queryKey: ['favoriteRecipes'],
    queryFn: getFavoriteRecipes,
    enabled: isAuthenticated,
  });

  const isSavedFromApi = useMemo(
    () => favorites.some((recipe) => recipe._id === recipeId),
    [favorites, recipeId],
  );
  const isSaved = savedOverride ?? isSavedFromApi;

  const mutation = useMutation({
    mutationFn: async () => {
      if (isSaved) {
        await removeFavoriteRecipe(recipeId);
      } else {
        await addFavoriteRecipe(recipeId);
      }
    },
    onSuccess: () => {
      setSavedOverride(!isSaved);
      queryClient.invalidateQueries({ queryKey: ['favoriteRecipes'] });
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });

  const handleClick = () => {
    if (!isAuthenticated) {
      openModal();
      return;
    }

    mutation.mutate();
  };

  const Icon = isSaved ? BookmarkSavedIcon : BookmarkIcon;

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleClick}
      disabled={mutation.isPending}
      aria-label={isSaved ? 'Unsave recipe' : 'Save recipe'}
    >
      <span>{mutation.isPending ? 'Saving...' : isSaved ? 'Unsave' : 'Save'}</span>
      <Icon className={styles.icon} />
    </button>
  );
}
