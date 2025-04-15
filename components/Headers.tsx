'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('lux-logged-in') === 'true';
    setLoggedIn(isLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('lux-logged-in');
    window.location.href = '/login'; // 登出後跳回登入頁
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 border-b">
      <div className="text-3xl font-serif font-bold tracking-wide">L∪X</div>
      <nav className="space-x-6 text-base text-gray-600">
        {!loggedIn ? (
          <>
            <Link href="/">找房</Link>
            <Link href="#">顧問</Link>
            <Link href="#">關於我們</Link>
            <Link href="/login">登入</Link>
          </>
        ) : (
          <>
            <Link href="/dashboard">顧問後台</Link>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:underline"
            >
              登出
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
