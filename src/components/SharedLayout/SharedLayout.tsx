// import { Header } from '../Header/Header';
// import { Footer } from '../Footer/Footer';

// export const SharedLayout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div
//       style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
//     >
//       <Header />

//       <main style={{ flexGrow: 1 }}>{children}</main>

//       <Footer />
//     </div>
//   );
// };
'use client';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { AuthModal } from '../AuthModal/AuthModal';
import { useAuthModalStore } from '@/lib/store/authModalStore';

export const SharedLayout = ({ children }: { children: React.ReactNode }) => {
  const isOpen = useAuthModalStore((state) => state.isOpen);
  const closeModal = useAuthModalStore((state) => state.closeModal);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />

      <main style={{ flexGrow: 1 }}>{children}</main>

      <Footer />

      {isOpen && <AuthModal onClose={closeModal} />}
    </div>
  );
};