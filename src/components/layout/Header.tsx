'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import Image from 'next/image';

export const Header = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b">
    <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
      <Link href="/">
        <Image
          src="/images/logo.svg"
          alt="Pick n Click Logo"
          height={40}
          width={160}
        />
      </Link>
  
      <nav className="flex items-center gap-4 text-sm">
        <Link href="/cart">장바구니</Link>
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
  )}