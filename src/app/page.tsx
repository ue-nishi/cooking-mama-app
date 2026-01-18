'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Loading } from '@/components/ui/Loading';
import { useCartStore } from '@/stores/useCartStore';
import { loginSchema } from '@/lib/validation';
import toast from 'react-hot-toast';

export default function TestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const { selectedRecipeIds, addRecipe, removeRecipe, clearCart, isRecipeSelected } = useCartStore();

  const testRecipes = [
    { id: 1, title: 'レシピ1' },
    { id: 2, title: 'レシピ2' },
    { id: 3, title: 'レシピ3' },
    { id: 4, title: 'レシピ4（3件制限テスト）' },
  ];

  const handleAddRecipe = (id: number) => {
    const success = addRecipe(id);
    if (success) {
      toast.success(`レシピ${id}を追加しました`);
    } else {
      if (selectedRecipeIds.includes(id)) {
        toast.error('既に選択済みです');
      } else {
        toast.error('最大3件までです');
      }
    }
  };

  const handleRemoveRecipe = (id: number) => {
    removeRecipe(id);
    toast.success(`レシピ${id}を削除しました`);
  };

  const handleValidation = () => {
    setValidationError('');
    const result = loginSchema.safeParse({ email, password });
    if (result.success) {
      toast.success('バリデーション成功！');
    } else {
      const errorMessage = result.error.errors[0].message;
      setValidationError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleLoadingTest = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">共通コンポーネント動作確認</h1>
          <p className="mt-2 text-gray-600">作成した共通ファイルの動作テスト</p>
        </header>

        {/* Button Component */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Button コンポーネント</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" onClick={() => toast.success('Primary clicked!')}>
              Primary Button
            </Button>
            <Button variant="secondary" onClick={() => toast.info('Secondary clicked!')}>
              Secondary Button
            </Button>
            <Button variant="danger" onClick={() => toast.error('Danger clicked!')}>
              Danger Button
            </Button>
            <Button variant="primary" isLoading>
              Loading Button
            </Button>
            <Button variant="primary" disabled>
              Disabled Button
            </Button>
          </div>
        </section>

        {/* Input Component */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Input コンポーネント</h2>
          <div className="space-y-4 max-w-md">
            <Input
              label="メールアドレス"
              type="email"
              placeholder="test@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="パスワード"
              type="password"
              placeholder="8文字以上"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={validationError}
            />
            <Button onClick={handleValidation}>バリデーション実行</Button>
          </div>
        </section>

        {/* Modal Component */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Modal コンポーネント</h2>
          <div className="flex gap-4">
            <Button onClick={() => setIsModalOpen(true)}>モーダルを開く</Button>
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="テストモーダル"
            size="md"
          >
            <div className="space-y-4">
              <p>これはモーダルのコンテンツです。</p>
              <Input label="モーダル内の入力" placeholder="何か入力してください" />
              <div className="flex gap-2 justify-end">
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                  キャンセル
                </Button>
                <Button onClick={() => {
                  toast.success('モーダル内のアクション実行！');
                  setIsModalOpen(false);
                }}>
                  実行
                </Button>
              </div>
            </div>
          </Modal>
        </section>

        {/* Loading Component */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Loading コンポーネント</h2>
          <Button onClick={handleLoadingTest}>ローディング表示（2秒）</Button>
          {isLoading && (
            <div className="mt-4">
              <Loading text="データ読み込み中..." />
            </div>
          )}
        </section>

        {/* Toast Notifications */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Toast 通知</h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => toast.success('成功メッセージ')}>Success Toast</Button>
            <Button onClick={() => toast.error('エラーメッセージ')}>Error Toast</Button>
            <Button onClick={() => toast('情報メッセージ')}>Info Toast</Button>
            <Button onClick={() => toast.loading('処理中...')}>Loading Toast</Button>
          </div>
        </section>

        {/* Cart Store */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Cart Store（Zustand）</h2>
          <div className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-md">
              <p className="font-semibold">選択中のレシピ: {selectedRecipeIds.length}/3</p>
              <p className="text-sm text-gray-600">
                {selectedRecipeIds.length > 0
                  ? `[${selectedRecipeIds.join(', ')}]`
                  : '（なし）'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {testRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className={`p-4 rounded-md border-2 ${
                    isRecipeSelected(recipe.id)
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200'
                  }`}
                >
                  <p className="font-medium mb-2">{recipe.title}</p>
                  {isRecipeSelected(recipe.id) ? (
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveRecipe(recipe.id)}
                      className="w-full"
                    >
                      削除
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleAddRecipe(recipe.id)}
                      className="w-full"
                    >
                      追加
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button variant="secondary" onClick={clearCart}>
              カートをクリア
            </Button>
          </div>
        </section>

        {/* Type Definitions */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">型定義（TypeScript）</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <pre className="text-sm overflow-x-auto">
              {`// src/types/index.ts の型を使用
const recipe: Recipe = {
  id: 1,
  title: "テストレシピ",
  ingredients: [
    { name: "材料1", amount: "100", unit: "g" }
  ],
  steps: [
    { stepNumber: 1, description: "手順1" }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
};`}
            </pre>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
          <h2 className="text-xl font-semibold mb-4 text-green-800">✅ 確認項目</h2>
          <ul className="space-y-2 text-green-700">
            <li>✓ Button: 各variantと状態が正常に表示される</li>
            <li>✓ Input: ラベル、エラー表示、フォーカススタイルが動作する</li>
            <li>✓ Modal: 開閉、backdrop、コンテンツ表示が正常</li>
            <li>✓ Loading: スピナーアニメーションが表示される</li>
            <li>✓ Toast: 各種通知が右上に表示される</li>
            <li>✓ Cart Store: 追加/削除、3件制限、状態管理が動作</li>
            <li>✓ Validation: zodスキーマでバリデーションエラーが表示される</li>
            <li>✓ Types: TypeScriptの型チェックが通る</li>
          </ul>
        </section>
      </div>
    </div>
  );
}