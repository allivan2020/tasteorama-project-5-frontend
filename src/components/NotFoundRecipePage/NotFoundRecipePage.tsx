import Link from 'next/link';

import styles from './NotFoundRecipePage.module.css';

export function NotFoundRecipePage() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          <div
            className={styles.imagePlaceholder}
            role="img"
            aria-label="Empty plate"
          />

          <div className={styles.content}>
            <h1>404</h1>
            <p>Recipe not found</p>
            <Link href="/" className={styles.link}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
