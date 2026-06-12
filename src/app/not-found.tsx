import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 - Сторінку не знайдено</h1>
      <p>Вибачте, але такого маршруту не існує.</p>
      <Link href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
        Повернутися на головну
      </Link>
    </main>
  );
}
