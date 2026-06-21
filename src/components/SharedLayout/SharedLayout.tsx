'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { AuthModal } from '../AuthModal/AuthModal';
import { useAuthModalStore } from '@/lib/store/authModalStore';
import { useAuthStore } from '@/lib/store/authStore';

export const SharedLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const isOpen = useAuthModalStore((state) => state.isOpen);
  const closeModal = useAuthModalStore((state) => state.closeModal);

  const isAuthPage = pathname === '/auth/login' || pathname === '/auth/register';

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      closeModal();
    }
  }, [isAuthenticated, isOpen, closeModal]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          marginTop: '64px',
        }}
      >
        {children}
      </main>

      <Footer />

      {isOpen && !isAuthPage && !isAuthenticated && (
        <AuthModal onClose={closeModal} />
      )}
    </div>
  );
};