'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import css from '@/app/(private)/profile/ProfileLayout.module.css';

const profileLinks = [
  { href: '/profile/own', label: 'My Recipes' },
  { href: '/profile/favorites', label: 'Saved Recipes' },
] as const;

export default function ProfileNavigation() {
  const pathname = usePathname();

  return (
    <nav className={css.tabs} aria-label="Profile recipes">
      {profileLinks.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`${css.link} ${isActive ? css.linkActive : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
