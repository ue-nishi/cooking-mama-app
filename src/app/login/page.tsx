'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const ChefHatIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C10.9 2 10 2.9 10 4C10 4.09 10.01 4.18 10.02 4.27C8.27 4.9 7 6.58 7 8.5C7 9.94 7.68 11.21 8.73 12H5V22H19V12H15.27C16.32 11.21 17 9.94 17 8.5C17 6.58 15.73 4.9 13.98 4.27C13.99 4.18 14 4.09 14 4C14 2.9 13.1 2 12 2M12 4.5C12.28 4.5 12.5 4.72 12.5 5C12.5 5.28 12.28 5.5 12 5.5C11.72 5.5 11.5 5.28 11.5 5C11.5 4.72 11.72 4.5 12 4.5M9 8.5C9 7.12 10.12 6 11.5 6H12.5C13.88 6 15 7.12 15 8.5C15 9.88 13.88 11 12.5 11H11.5C10.12 11 9 9.88 9 8.5M7 14H17V20H7V14Z" />
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('ログインしました');
        router.push('/recipes');
      } else {
        toast.error(data.error || 'ログインに失敗しました');
      }
    } catch (error) {
      toast.error('ログインに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* 白いカード */}
        <div className="rounded-3xl bg-white px-8 py-10 shadow-xl">
          {/* アイコンとタイトル */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-500 shadow-md">
              <ChefHatIcon className="h-14 w-14 text-white" />
            </div>
            <h1 className="text-3xl font-medium text-gray-700">
              レシピ手順最適化
            </h1>
            <p className="mt-3 text-base text-gray-500">
              効率的な調理をサポートします
            </p>
          </div>

          {/* フォーム */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* ユーザー名 */}
            <div>
              <label className="mb-3 block text-lg font-medium text-gray-700">
                ユーザー名
              </label>
              <input
                type="email"
                placeholder="ユーザー名を入力"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border-2 border-gray-200 px-6 py-5 text-lg text-gray-700 placeholder-gray-400 transition focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* パスワード */}
            <div>
              <label className="mb-3 block text-lg font-medium text-gray-700">
                パスワード
              </label>
              <input
                type="password"
                placeholder="パスワードを入力"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border-2 border-gray-200 px-6 py-5 text-lg text-gray-700 placeholder-gray-400 transition focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* ボタン */}
            <div className="flex flex-col space-y-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-orange-500 py-4 text-lg font-semibold text-white shadow-md transition hover:bg-orange-600 disabled:opacity-50"
              >
                {isLoading ? '読み込み中...' : 'ログイン'}
              </button>
              
              <button
                type="button"
                onClick={() => router.push('/register')}
                className="w-full rounded-xl border-[3px] border-orange-500 bg-white py-4 text-lg font-semibold text-orange-500 transition hover:bg-orange-50"
              >
                新規登録
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}