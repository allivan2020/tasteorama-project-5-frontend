'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../lib/store/authStore';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);


  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.replace('/sign-in');
    }
  }, [isMounted, isAuthenticated, router]);

  
  if (!isMounted || !isAuthenticated) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div>Завантаження додатку...</div>
      </div>
    );
  }

  return <>{children}</>;
}
