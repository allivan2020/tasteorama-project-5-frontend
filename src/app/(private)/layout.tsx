'use client';

// Згодом тут знадобляться ці імпорти для перевірки токена
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Тут логіка отримання стану авторизації 
  // const isAuthenticated = false; // Заглушка
  // const router = useRouter();


 

  return <>{children}</>;
}
