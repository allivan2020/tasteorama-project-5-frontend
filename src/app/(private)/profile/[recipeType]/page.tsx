import { notFound } from 'next/navigation';
import { SavedRecipes } from '@/components/SavedRecipes/SavedRecipes';
import { RecipesList } from '@/components/RecipesList/RecipesList';

const PROFILE_RECIPE_TYPES = ['own', 'favorites'] as const;

type ProfileRecipeType = (typeof PROFILE_RECIPE_TYPES)[number];

function isProfileRecipeType(
    recipeType: string,
): recipeType is ProfileRecipeType {
  return (PROFILE_RECIPE_TYPES as readonly string[]).includes(recipeType);
}


export default async function RecipeTypePage({params,}: {
  params: Promise<{ recipeType: string }>;
}) {
  const { recipeType } = await params;

  if (!isProfileRecipeType(recipeType)) {
    notFound();
  }

  if (recipeType === 'favorites') {
    return <SavedRecipes />;
  }

  return <RecipesList recipeType="own" />;
}