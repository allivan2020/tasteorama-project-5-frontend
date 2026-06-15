//

'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useAuthStore } from '@/lib/store/authStore';
import { useAuthModalStore } from '@/lib/store/authModalStore';

import styles from './Footer.module.css';

export const Footer = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isModalOpen = useAuthModalStore((state) => state.isOpen);
  const openModal = useAuthModalStore((state) => state.openModal);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/icon.png"
            alt="Tasteorama logo"
            width={32}
            height={30}
            className={styles.logoImage}
          />
          <span>Tasteorama</span>
        </Link>

        <p className={styles.copy}>
          © 2025 CookingCompanion. All rights reserved
        </p>

        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>
            Recipes
          </Link>

          {isAuthenticated ? (
            <Link href="/profile/own" className={styles.link}>
              Account
            </Link>
          ) : (
            !isModalOpen && (
              <button
                type="button"
                className={styles.linkButton}
                onClick={openModal}
              >
                Account
              </button>
            )
          )}
        </nav>
      </div>
    </footer>
  );
};