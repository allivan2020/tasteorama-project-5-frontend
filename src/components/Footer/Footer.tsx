'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useAuthStore } from '@/lib/store/authStore';

import styles from './Footer.module.css';

export const Footer = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

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
            <Link href="/auth/login" className={styles.link}>
              Account
            </Link>
          )}
        </nav>
      </div>
    </footer>
  );
};