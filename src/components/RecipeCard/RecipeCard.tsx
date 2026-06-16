'use client';

import Image from 'next/image';
import Link from 'next/link';
import ClockIcon from '@/assets/icons/Time-clock.svg';
import BookmarkIcon from '@/assets/icons/Generic-bookmark.svg';
import { Recipe } from '@/lib/api/recipesApi';
import styles from './RecipeCard.module.css';

type Props = {
  recipe: Recipe;
};

export const RecipeCard = ({ recipe }: Props) => {
  return (
    <li className={styles.card}>
      <div className={styles.thumbnail}>
        <Image
          src={recipe.image || '/recipe-1.jpg'}
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
