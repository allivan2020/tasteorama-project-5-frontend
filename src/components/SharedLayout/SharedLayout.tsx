import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export const SharedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Header />

      <main style={{ flexGrow: 1 }}>{children}</main>

      <Footer />
    </div>
  );
};
