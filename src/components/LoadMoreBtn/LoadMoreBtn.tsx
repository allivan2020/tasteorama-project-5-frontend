'use client';

import { ThreeDots } from 'react-loader-spinner';
import styles from './LoadMoreBtn.module.css';

type Props = {
  onClick: () => void;
  isLoading: boolean;
};

export const LoadMoreBtn = ({ onClick, isLoading }: Props) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <ThreeDots
          height="24"
          width="48"
          color="#fff"
          ariaLabel="loading"
          visible={true}
        />
      ) : (
        'Load More'
      )}
    </button>
  );
};
