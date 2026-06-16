'use client';

import styles from './Pagination.module.css';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  const getPages = (): (number | '...')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [1];

    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);
    return pages;
  };

  return (
    <nav className={styles.pagination} aria-label="Pages navigation">
      <button
        type="button"
        className={styles.navButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Back
      </button>

      <ul className={styles.pageList}>
        {getPages().map((page, index) =>
          page === '...' ? (
            <li key={`dots-${index}`} className={styles.dots}>
              …
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                className={`${styles.pageButton} ${
                  page === currentPage ? styles.pageButtonActive : ''
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        className={styles.navButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Forward →
      </button>
    </nav>
  );
};
