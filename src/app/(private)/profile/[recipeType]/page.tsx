import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ recipeType: string }>;
};

const PROFILE_RECIPE_TYPES = ['own', 'favorites'] as const;

function isProfileRecipeType(recipeType: string) {
  return PROFILE_RECIPE_TYPES.some((type) => type === recipeType);
}

export default async function RecipeTypePage({ params }: Props) {
  const { recipeType } = await params;

  if (!isProfileRecipeType(recipeType)) {
    notFound();
  }

  return null;
}
