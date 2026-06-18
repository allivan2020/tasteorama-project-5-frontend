"use client";

import Image from "next/image";
import Link from "next/link";
import ClockIcon from "@/assets/icons/Time-clock.svg";
import { Recipe } from "@/lib/api/recipesApi";
import { FavoriteRecipeButton } from "@/components/FavoriteRecipeButton/FavoriteRecipeButton";
import styles from "./RecipeCard.module.css";

const FALLBACK_IMAGES = [
  "/recipe-1.jpg",
  "/recipe-2.jpg",
  "/recipe-3.jpg",
  "/recipe-4.jpg",
  "/recipe-5.jpg",
  "/recipe-6.jpg",
  "/recipe-7.jpg",
  "/recipe-8.jpg",
  '/recipe-1.jpg',
  '/recipe-2.jpg',
  '/recipe-3.jpg',
  '/recipe-4.jpg',
  '/recipe-5.jpg',
  '/recipe-6.jpg',
  '/recipe-7.jpg',
  '/recipe-8.jpg',
  '/recipe-9.jpg',
  '/recipe-10.jpg',
  '/recipe-11.jpg',
  '/recipe-12.jpg',
];

type Props = {
  recipe: Recipe;
  index?: number;
};

export const RecipeCard = ({ recipe, index = 0 }: Props) => {
  const imageSrc =
    recipe.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

  return (
    <li className={styles.card}>
      <Image
        src={imageSrc}
        alt={recipe.title}
        width={337}
        height={230}
        className={styles.img}
      />

      <div className={styles.header}>
        <h3 className={styles.title}>{recipe.title}</h3>

        <div className={styles.timeBox}>
          <ClockIcon className={styles.clock} />

          <span className={styles.time}>
            {recipe.cookingTime ? `${recipe.cookingTime} min` : "—"}
          </span>
        </div>
      </div>

      <div className={styles.desBox}>
        <p>{recipe.description}</p>

        <p>Calories: {recipe.calories ? `~${recipe.calories} cals` : "—"}</p>
      </div>

      <div className={styles.btnBox}>
        <Link href={`/recipes/${recipe._id}`} className={styles.moreBtn}>
          Learn more
        </Link>

        <FavoriteRecipeButton recipeId={recipe._id} />
      </div>
    </li>
  );
};
