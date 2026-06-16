'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import css from '@/app/(private)/profile/ProfileLayout.module.css';

export default function ProfileTabs() {
    const pathname = usePathname();

    return (
        <nav className={css.tabs}>
            <Link
                href="/profile/own"
                className={`${css.link} ${pathname === '/profile/own' ? css.linkActive : ''}`}
            >
                My Recipes
            </Link>

            <Link
                href="/profile/favorites"
                className={`${css.link} ${pathname === '/profile/favorites' ? css.linkActive : ''}`}
            >
                Saved Recipes
            </Link>
        </nav>
    );
}