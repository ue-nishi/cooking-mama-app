'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';

const ChefHatIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C10.9 2 10 2.9 10 4C10 4.09 10.01 4.18 10.02 4.27C8.27 4.9 7 6.58 7 8.5C7 9.94 7.68 11.21 8.73 12H5V22H19V12H15.27C16.32 11.21 17 9.94 17 8.5C17 6.58 15.73 4.9 13.98 4.27C13.99 4.18 14 4.09 14 4C14 2.9 13.1 2 12 2M12 4.5C12.28 4.5 12.5 4.72 12.5 5C12.5 5.28 12.28 5.5 12 5.5C11.72 5.5 11.5 5.28 11.5 5C11.5 4.72 11.72 4.5 12 4.5M9 8.5C9 7.12 10.12 6 11.5 6H12.5C13.88 6 15 7.12 15 8.5C15 9.88 13.88 11 12.5 11H11.5C10.12 11 9 9.88 9 8.5M7 14H17V20H7V14Z" />
  </svg>
);

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; passwordConfirm?: string }>({});

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (password !== passwordConfirm) {
      setErrors({ passwordConfirm: 'パスワードが一致しません' });
      toast.error('パスワードが一致しません');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('登録が完了しました');
        router.push('/recipes');
      } else {
        toast.error(data.error || '登録に失敗しました');
        if (data.error.includes('メールアドレス')) {
          setErrors({ email: data.error });
        } else {
          setErrors({ password: data.error });
        }
      }
    } catch (error) {
      toast.error('登録に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-orange-50">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <div className="mb-4 rounded-full bg-orange-500 p-4 text-white">
            <ChefHatIcon className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            新規登録
          </h1>
          <p className="mt-2 text-gray-600">
            アカウントを作成してください
          </p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-lg">
          <form onSubmit={handleRegister} className="space-y-6">
            <Input
              label="メールアドレス"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />

            <Input
              label="パスワード"
              type="password"
              placeholder="8文字以上（英字と数字を含む）"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
            />

            <Input
              label="パスワード（確認）"
              type="password"
              placeholder="もう一度パスワードを入力"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              error={errors.passwordConfirm}
              required
            />

            <div className="space-y-4 pt-4">
              <Button
                type="submit"
                variant="primary"
                className="w-full text-lg"
                isLoading={isLoading}
              >
                登録
              </Button>
              <Button
                type="button"
                className="w-full text-lg border-2 border-orange-500 bg-white text-orange-500 hover:bg-orange-50"
                onClick={() => router.push('/login')}
              >
                ログインに戻る
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
