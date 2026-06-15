import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

export const SharedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
