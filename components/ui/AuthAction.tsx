'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { AUTH_TOKEN_KEY, USER_EMAIL_ENCODED_KEY, USER_EMAIL_HASH_KEY } from '@/lib/storageKeys';

export default function AuthAction() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let isActive = true;
    queueMicrotask(() => {
      if (isActive) setIsLoggedIn(Boolean(window.localStorage.getItem(AUTH_TOKEN_KEY)));
    });
    return () => {
      isActive = false;
    };
  }, []);

  const logout = () => {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    window.localStorage.removeItem(USER_EMAIL_ENCODED_KEY);
    window.localStorage.removeItem(USER_EMAIL_HASH_KEY);
    setIsLoggedIn(false);
    router.push('/login');
  };

  const className = 'inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#C8102E] px-4 text-xs font-black text-white shadow-lg shadow-[#C8102E]/20 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C8102E]/20 dark:bg-[#C9A84C] dark:text-zinc-950 dark:shadow-[#C9A84C]/20 dark:hover:bg-[#d8b95b] sm:px-5 sm:text-sm';

  if (isLoggedIn) {
    return (
      <button type="button" onClick={logout} className={className}>
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    );
  }

  if (pathname === '/login') return null;

  const redirect = encodeURIComponent(pathname || '/');
  return (
    <Link href={`/login?redirect=${redirect}&from=${redirect}`} className={className}>
      <LogIn className="h-4 w-4" />
      <span className="hidden sm:inline">Login</span>
    </Link>
  );
}
