
'use client';

import Link from 'next/link';
import styles from './AuthModal.module.css';

type AuthModalProps = {
  onClose: () => void;
};

export const AuthModal = ({ onClose }: AuthModalProps) => {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <h2 className={styles.title}>Authorization </h2>

        <p className={styles.text}>
          Please log in or create an account to continue.
        </p>

        <div className={styles.actions}>
          <Link href="/auth/login" className={styles.primaryLink}>
            Log in
          </Link>

          <Link href="/auth/register" className={styles.secondaryLink}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};