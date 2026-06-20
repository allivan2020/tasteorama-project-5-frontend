import type { Metadata } from 'next';

import { NotFoundRecipePage } from '@/components/NotFoundRecipePage/NotFoundRecipePage';
import { RecipeDetails } from '@/components/RecipeDetails/RecipeDetails';
import { getRecipeById } from '@/lib/api/recipesApi';

type RecipeDetailsPageProps = {
  params: Promise<{
    recipeId: string;
  }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

async function loadRecipe(recipeId: string) {
  try {
    return await getRecipeById(recipeId);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: RecipeDetailsPageProps): Promise<Metadata> {
  const { recipeId } = await params;
  const recipe = await loadRecipe(recipeId);

  if (!recipe) {
    return {
      title: 'Recipe not found | Tasteorama',
      description: 'The requested recipe could not be found.',
      metadataBase: new URL(siteUrl),
      openGraph: {
        title: 'Recipe not found | Tasteorama',
        description: 'The requested recipe could not be found.',
        url: `/recipes/${recipeId}`,
        siteName: 'Tasteorama',
        type: 'website',
      },
    };
  }

  const image = recipe.thumb ?? recipe.image ?? '/icon.png';
  const description =
    recipe.description || `Recipe details for ${recipe.title}`;

  return {
    title: `${recipe.title} | Tasteorama`,
    description,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: recipe.title,
      description,
      url: `/recipes/${recipe._id}`,
      siteName: 'Tasteorama',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
      type: 'article',
    },
  };
}

export default async function RecipeDetailsPage({
  params,
}: RecipeDetailsPageProps) {
  const { recipeId } = await params;
  const recipe = await loadRecipe(recipeId);

  if (!recipe) {
    return <NotFoundRecipePage />;
  }

  return <RecipeDetails recipe={recipe} />;
}
