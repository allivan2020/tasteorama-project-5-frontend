import type { Metadata } from "next";
import { Montserrat, DM_Sans } from "next/font/google";
import "./globals.css";

import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Toaster } from "react-hot-toast";
import { SharedLayout } from "@/components/SharedLayout/SharedLayout";
import { AuthProvider } from "@/lib/providers/AuthProvider";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  variable: "--font-family",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--second-family",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tasteorama",
  description: "Recipe app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${montserrat.variable} ${dmSans.variable}`}>
      <body>
        <AuthProvider>
          <TanStackProvider>
            <SharedLayout>{children}</SharedLayout>

            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
              }}
            />
          </TanStackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
