import Image from 'next/image';
import { RecipeDetailsFavoriteButton } from '@/components/RecipeDetailsFavoriteButton/RecipeDetailsFavoriteButton';
import styles from './RecipeDetails.module.css';
import {RecipeDetail} from "@/app/types/recipe";

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
  if (recipe.calories == null) {
    return null;
  }

  return `Approximately ${recipe.calories} kcal per serving`;
}

function formatIngredientMeasure(measure?: string) {
  if (!measure) {
    return null;
  }

  const units =
    'g|kg|oz|ml|l|tbsp|tsp|cup|cups|teaspoon|teaspoons|tablespoon|tablespoons';

  return measure
    .trim()
    .replace(/\s*\/\s*/g, ' / ')
    .replace(new RegExp(`([^\\s/])(${units})\\b`, 'gi'), '$1 $2')
    .replace(/\s{2,}/g, ' ');
}

export function RecipeDetails({ recipe }: RecipeDetailsProps) {
 const imageSrc = recipe.thumb ?? recipe.image ?? '/default-recipe.jpg';
  const cookingTime = getCookingTime(recipe);
  const calories = getCalories(recipe);

  const instructions = recipe.instructions
      .split(/\r?\n/)
      .filter(Boolean);

  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>{recipe.title}</h1>

        <div className={styles.imageFrame}>
          <Image
            src={imageSrc}
            alt={recipe.title}
            width={586}
            height={493}
            priority
            sizes="(min-width: 1440px) 586px, (min-width: 768px) 586px, 100vw"
            className={styles.image}
          />
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
                  {recipe.ingredients.map((ingredient) => {
                    const measure = formatIngredientMeasure(ingredient.measure);

                    return (
                      <li
                        key={`${ingredient.name}-${ingredient.measure ?? ''}`}
                      >
                        <span>{ingredient.name}</span>
                        {measure && <span>{measure}</span>}
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

            {!!recipe.instructions.length && (
              <section className={styles.textBlock}>
                <h2>Preparation Steps:</h2>
                <div className={styles.steps}>
                  {instructions.map((step, index) => (
                    <p key={index}>{step}</p>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className={styles.aside} aria-label="Recipe information">
            <div className={styles.infoCard}>
              <h2>General information</h2>
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
