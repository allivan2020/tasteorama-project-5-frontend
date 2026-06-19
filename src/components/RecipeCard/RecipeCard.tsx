"use client";

import Image from "next/image";
import Link from "next/link";
import ClockIcon from "@/assets/icons/clock-icon.svg";
import {Recipe} from "@/app/types/recipe";
import {FavoriteRecipeButton} from "@/components/FavoriteRecipeButton/FavoriteRecipeButton";
import styles from "./RecipeCard.module.css";

const FALLBACK_IMAGES = [
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

export const RecipeCard = ({recipe, index = 0}: Props) => {
    const imageSrc =
        recipe.thumb || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

    return (
        <li className={styles.recipeCard}>
            <Image
                src={imageSrc}
                alt={recipe.title}
                width={337}
                height={230}
                className={styles.recipeImage}
            />

            <div className={styles.cardHeader}>
                <h3 className={styles.recipeTitle}>{recipe.title}</h3>

                <div className={styles.timeBox}>
                    <ClockIcon className={styles.timeIcon}/>
                    <span className={styles.time}>
                        {recipe.time ? `${recipe.time}` : "—"}
                     </span>
                </div>
            </div>

            <p className={styles.recipeDescription}>{recipe.description}</p>
            <p className={styles.recipeCalories}> ~ {recipe.calories ? `${recipe.calories} cals` : "150 cals"}</p>

            <div className={styles.actions}>
                <Link href={`/recipes/${recipe._id}`} className={styles.detailsButton}>
                    Learn more
                </Link>

                <FavoriteRecipeButton recipeId={recipe._id}/>
            </div>
        </li>
    );
};
