'use client';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { AuthModal } from '../AuthModal/AuthModal';
import { useAuthModalStore } from '@/lib/store/authModalStore';

export const SharedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isOpen = useAuthModalStore((state) => state.isOpen);
  const closeModal = useAuthModalStore((state) => state.closeModal);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          minHeight: 0,
        }}
      >
        {children}
      </main>

      <Footer />

      {isOpen && <AuthModal onClose={closeModal} />}
    </div>
  );
};