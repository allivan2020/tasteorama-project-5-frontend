'use client';

import Image from 'next/image';
import Link from 'next/link';
import ClockIcon from '@/assets/icons/Time-clock.svg';
import BookmarkIcon from '@/assets/icons/Generic-bookmark-alternative.svg';
import { Recipe } from '@/lib/api/recipesApi';
import styles from './RecipeCard.module.css';

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

export const RecipeCard = ({ recipe, index = 0 }: Props) => {
  const imageSrc = recipe.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

  return (
    <li className={styles.card}>
      <div className={styles.thumbnail}>
        <Image
          src={imageSrc}
          alt={recipe.title}
          fill
          sizes="264px"
          className={styles.photo}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{recipe.title}</h3>
          <span className={styles.cookingTime}>
            <ClockIcon className={styles.clockIcon} />
            {recipe.cookingTime}
          </span>
        </div>

        <p className={styles.description}>{recipe.description}</p>

        <p className={styles.calories}>~{recipe.calories} cals</p>

        <div className={styles.footer}>
          <Link href={`/recipes/${recipe._id}`} className={styles.detailsLink}>
            Learn more
          </Link>
          <button
            type="button"
            className={styles.saveButton}
            aria-label="Save recipe"
          >
            <BookmarkIcon className={styles.bookmarkIcon} />
          </button>
        </div>
      </div>
    </li>
  );
};
