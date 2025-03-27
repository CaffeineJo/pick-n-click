'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import { ShoppingBasket } from 'lucide-react';
import { Caveat } from 'next/font/google';
import supabase from '@/services/supabase';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400'],
});

export const Header = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <Link href="/">
          <div className={`${caveat.className} text-4xl`}>Pick n Click</div>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/cart">
            <div
              title="장바구니"
              className="relative rounded-full bg-black p-2 transition hover:bg-gray-600"
            >
              <ShoppingBasket className="h-5 w-5 text-white" />
            </div>
          </Link>
          {user ? (
            <>
              <Link href="/mypage">마이페이지</Link>
              <button onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <>
              <Link href="/login">로그인</Link>
              <Link href="/register">회원가입</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
