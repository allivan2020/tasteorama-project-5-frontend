export default function RecipeDetailsPage({
  params,
}: {
  params: { recipeId: string };
}) {
  return (
    <main>
      <h1>Recipe Details</h1>
      <p>ID рецепта: {params.recipeId}</p>
    </main>
  );
}