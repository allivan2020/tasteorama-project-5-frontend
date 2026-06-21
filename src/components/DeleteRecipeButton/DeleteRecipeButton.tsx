"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import TrashIcon from "@/assets/icons/trash.svg";
import stylesCard from "@/components/RecipeCard/RecipeCard.module.css";
import { deleteRecipe } from "@/lib/api/recipesApi";

type Props = {
  recipeId: string;
};

export const DeleteRecipeButton = ({ recipeId }: Props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteRecipe(recipeId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ownRecipes"],
      });

      toast.success("Recipe deleted successfully");
    },

    onError: () => {
      toast.error("Failed to delete recipe");
    },
  });

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?",
    );

    if (!confirmed) return;

    mutation.mutate();
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className={`${stylesCard.favoriteButton} ${stylesCard.isDeleteHover}`}
      aria-label="Delete recipe"
    >
      <TrashIcon className={stylesCard.bookmarkIcon} />
    </button>
  );
};
