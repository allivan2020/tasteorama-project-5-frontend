'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Глобальна помилка додатку:', error);
  }, [error]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
      <h2>Щось пішло не так!</h2>
      <p>{error.message || 'Сталася непередбачувана помилка.'}</p>
      <button
        onClick={() => reset()}
        style={{ padding: '0.5rem 1rem', marginTop: '1rem', cursor: 'pointer' }}
      >
        Спробувати знову
      </button>
    </div>
  );
}
