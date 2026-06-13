'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { AuthModal } from '@/components/AuthModal/AuthModal';
import styles from './Footer.module.css';

export const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
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
      onClick={() => setIsModalOpen(true)}
    >
      Account
    </button>
  )
)}
            
          </nav>
        </div>
      </footer>

      {isModalOpen && <AuthModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};