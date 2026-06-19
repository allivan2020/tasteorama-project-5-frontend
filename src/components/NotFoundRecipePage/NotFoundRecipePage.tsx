import Link from 'next/link';
import Image from 'next/image';

import styles from './NotFoundRecipePage.module.css';

export function NotFoundRecipePage() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          <Image
            src="/404.jpg"
            alt="Empty plate"
            width={600}
            height={438}
            className={styles.image}
            priority
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
