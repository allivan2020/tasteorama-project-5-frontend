import type { Metadata } from 'next';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Toaster } from 'react-hot-toast';
import './globals.css';


export const metadata: Metadata = {
  title: 'Tasteorama - Твій Помічник',
  description: 'Зручний додаток для командної роботи та керування завданнями',
  openGraph: {
    title: 'Tasteorama',
    description: 'Зручний додаток для командної роботи',
    url: 'https://tasteorama-project.vercel.app', // Замінити на реальний домен згодом
    siteName: 'Tasteorama',
    images: [
      {
        url: '/og-image.jpg', // Картинка
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <TanStackProvider>
          {children}

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </TanStackProvider>
      </body>
    </html>
  );
}
