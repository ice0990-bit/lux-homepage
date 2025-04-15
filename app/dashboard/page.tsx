'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('lux-logged-in');
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('lux-logged-in');
    router.push('/login');
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">👋 歡迎回來，LUX 顧問</h1>
      <p className="text-gray-600 mb-6">這是您的後台專區，未來可放物件管理、表單、客戶名單等功能。</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        登出
      </button>
    </div>
  );
}
