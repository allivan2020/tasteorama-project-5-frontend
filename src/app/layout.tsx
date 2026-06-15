import type { Metadata } from 'next';
import { Montserrat, DM_Sans } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { SharedLayout } from '@/components/SharedLayout/SharedLayout';

// Налаштування основного шрифту
const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700'],
  variable: '--font-family',
  display: 'swap',
});

// Налаштування додаткового шрифту
const dmSans = DM_Sans({
  subsets: ['latin'], 
  weight: ['700'],
  variable: '--second-family',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Tasteorama - Твій Помічник',
  description: 'Зручний додаток для пошуку, збереження та створення рецептів',
  icons: {
    icon: [
      { url: '/icon.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon_dark.png', media: '(prefers-color-scheme: dark)' },
    ],
  },
  openGraph: {
    title: 'Tasteorama',
    description: 'Зручний додаток для пошуку, збереження та створення рецептів',
    url: 'https://tasteorama-project.vercel.app', // Замінити на реальний домен згодом
    siteName: 'Tasteorama',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tasteorama Preview',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${montserrat.variable} ${dmSans.variable}`}>
      <body>
        <TanStackProvider>
          {/* Layout з Header та Footer */}
          <SharedLayout>{children}</SharedLayout>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--darck-gray)', // Можна використати змінні з CSS
                color: 'var(--white)',
              },
            }}
          />
        </TanStackProvider>
      </body>
    </html>
  );
}
