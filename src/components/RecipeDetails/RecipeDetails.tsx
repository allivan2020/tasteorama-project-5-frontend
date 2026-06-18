import Image from 'next/image';

import type { RecipeDetail } from '@/lib/api/recipesApi';
import { RecipeDetailsFavoriteButton } from '@/components/RecipeDetailsFavoriteButton/RecipeDetailsFavoriteButton';

import styles from './RecipeDetails.module.css';

type RecipeDetailsProps = {
  recipe: RecipeDetail;
};

function getCookingTime(recipe: RecipeDetail) {
  if (recipe.time) {
    return recipe.time;
  }

  if (recipe.cookingTime) {
    return `${recipe.cookingTime} minutes`;
  }

  return null;
}

function getCalories(recipe: RecipeDetail) {
  if (!recipe.calories) {
    return null;
  }

  return typeof recipe.calories === 'number'
    ? `Approximately ${recipe.calories} kcal per serving`
    : recipe.calories;
}

export function RecipeDetails({ recipe }: RecipeDetailsProps) {
  const imageSrc = recipe.thumb ?? recipe.image;
  const cookingTime = getCookingTime(recipe);
  const calories = getCalories(recipe);

  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>{recipe.title}</h1>

        <div className={styles.imageFrame}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={recipe.title}
              width={586}
              height={493}
              priority
              sizes="(min-width: 1440px) 586px, (min-width: 768px) 586px, 100vw"
              className={styles.image}
            />
          ) : (
            <div className={styles.imagePlaceholder} aria-hidden="true" />
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.mainColumn}>
            {recipe.description && (
              <section className={styles.textBlock}>
                <h2>About recipe</h2>
                <p>{recipe.description}</p>
              </section>
            )}

            {!!recipe.ingredients.length && (
              <section className={styles.textBlock}>
                <h2>Ingredients:</h2>
                <ul className={styles.ingredients}>
                  {recipe.ingredients.map((ingredient) => (
                    <li key={`${ingredient.name}-${ingredient.measure ?? ''}`}>
                      <span>{ingredient.name}</span>
                      {ingredient.measure && <span>{ingredient.measure}</span>}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {!!recipe.instructions.length && (
              <section className={styles.textBlock}>
                <h2>Preparation Steps:</h2>
                <div className={styles.steps}>
                  {recipe.instructions.map((step, index) => (
                    <p key={`${index}-${step}`}>{step}</p>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className={styles.aside} aria-label="Recipe information">
            <div className={styles.infoCard}>
              <h2>General informations</h2>
              <dl className={styles.infoList}>
                {recipe.category && (
                  <div>
                    <dt>Category:</dt>
                    <dd>{recipe.category}</dd>
                  </div>
                )}

                {cookingTime && (
                  <div>
                    <dt>Cooking time:</dt>
                    <dd>{cookingTime}</dd>
                  </div>
                )}

                {calories && (
                  <div>
                    <dt>Caloric content:</dt>
                    <dd>{calories}</dd>
                  </div>
                )}
              </dl>
            </div>

            <RecipeDetailsFavoriteButton recipeId={recipe._id} />
          </aside>
        </div>
      </div>
    </section>
  );
}
