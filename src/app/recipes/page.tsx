'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/useCartStore';
import { Recipe } from '@/types';
import toast from 'react-hot-toast';

const ShoppingCartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
  </svg>
);

const ChefHatIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C10.9 2 10 2.9 10 4C10 4.09 10.01 4.18 10.02 4.27C8.27 4.9 7 6.58 7 8.5C7 9.94 7.68 11.21 8.73 12H5V22H19V12H15.27C16.32 11.21 17 9.94 17 8.5C17 6.58 15.73 4.9 13.98 4.27C13.99 4.18 14 4.09 14 4C14 2.9 13.1 2 12 2M12 4.5C12.28 4.5 12.5 4.72 12.5 5C12.5 5.28 12.28 5.5 12 5.5C11.72 5.5 11.5 5.28 11.5 5C11.5 4.72 11.72 4.5 12 4.5M9 8.5C9 7.12 10.12 6 11.5 6H12.5C13.88 6 15 7.12 15 8.5C15 9.88 13.88 11 12.5 11H11.5C10.12 11 9 9.88 9 8.5M7 14H17V20H7V14Z" />
  </svg>
);

export default function RecipesPage() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { selectedRecipeIds, addRecipe, removeRecipe, clearCart, isRecipeSelected } = useCartStore();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes');
      const data = await response.json();
      
      if (data.success) {
        setRecipes(data.data);
      } else {
        toast.error('レシピの取得に失敗しました');
      }
    } catch (error) {
      toast.error('レシピの取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRecipe = (recipeId: number) => {
    const success = addRecipe(recipeId);
    if (success) {
      toast.success('レシピをカートに追加しました');
    } else {
      if (isRecipeSelected(recipeId)) {
        toast.error('既に選択済みです');
      } else {
        toast.error('最大3件までです');
      }
    }
  };

  const handleRemoveRecipe = (recipeId: number) => {
    removeRecipe(recipeId);
    toast.success('レシピをカートから削除しました');
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      const data = await response.json();
      
      if (data.success) {
        toast.success('ログアウトしました');
        router.push('/login');
      }
    } catch (error) {
      toast.error('ログアウトに失敗しました');
    }
  };

  const handleProceedToCooking = () => {
    if (selectedRecipeIds.length === 0) {
      toast.error('レシピを選択してください');
      return;
    }
    router.push('/cooking/confirm');
  };

  const selectedRecipes = recipes.filter(recipe => isRecipeSelected(recipe.id));
  const totalTime = selectedRecipes.reduce((sum, recipe) => {
    const recipeTime = recipe.steps.reduce((stepSum, step) => stepSum + (step.estimatedMinutes || 0), 0);
    return sum + recipeTime;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ChefHatIcon className="h-8 w-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-800">レシピ手順最適化</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/history')}
              className="text-gray-600 hover:text-gray-800 transition"
            >
              マイページ
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800 transition"
            >
              ログアウト
            </button>
          </div>
        </div>
      </header>

      {/* カートボタン（固定） */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-4 rounded-r-lg shadow-lg hover:bg-orange-600 transition z-40"
      >
        <div className="flex flex-col items-center">
          <ShoppingCartIcon className="h-6 w-6" />
          <span className="text-sm mt-1">選択したレシピ</span>
          <span className="text-lg font-bold">{selectedRecipeIds.length}/3</span>
          <span className="text-xs">個</span>
        </div>
      </button>

      {/* カートスライドパネル */}
      <div
        className={`fixed inset-y-0 left-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isCartOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* カートヘッダー */}
          <div className="bg-orange-500 text-white p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">選択したレシピ</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-white hover:text-orange-100"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-orange-100">{selectedRecipeIds.length}/3 個</p>
          </div>

          {/* カート内容 */}
          <div className="flex-1 overflow-y-auto p-4">
            {selectedRecipes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <ShoppingCartIcon className="h-16 w-16 mb-4" />
                <p>レシピが選択されていません</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedRecipes.map((recipe) => (
                  <div key={recipe.id} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{recipe.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span>
                        {recipe.steps.reduce((sum, step) => sum + (step.estimatedMinutes || 0), 0)}分
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveRecipe(recipe.id)}
                      className="text-red-500 text-sm hover:text-red-700 transition"
                    >
                      削除
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* カートフッター */}
          <div className="border-t p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">合計調理時間（目安）</span>
              <span className="font-semibold text-gray-800">{totalTime}分</span>
            </div>
            <button
              onClick={handleProceedToCooking}
              disabled={selectedRecipeIds.length === 0}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              調理を確認しましょう
            </button>
            {selectedRecipeIds.length > 0 && (
              <button
                onClick={() => {
                  clearCart();
                  toast.success('カートをクリアしました');
                }}
                className="w-full border-2 border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                カートをクリア
              </button>
            )}
          </div>
        </div>
      </div>

      {/* オーバーレイ */}
      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">メニューを選択</h2>
          <p className="text-gray-600">作りたいレシピを選んで、最適化された手順を確認しましょう</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => {
              const totalMinutes = recipe.steps.reduce((sum, step) => sum + (step.estimatedMinutes || 0), 0);
              const difficulty = totalMinutes < 30 ? '簡単' : totalMinutes < 60 ? '普通' : '難しい';
              const selected = isRecipeSelected(recipe.id);

              return (
                <div
                  key={recipe.id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden transition ${
                    selected ? 'ring-4 ring-orange-500' : ''
                  }`}
                >
                  {/* レシピ画像 */}
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {recipe.imageUrl ? (
                      <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
                    ) : (
                      <ChefHatIcon className="h-16 w-16 text-gray-400" />
                    )}
                  </div>

                  {/* レシピ情報 */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description || '本格的なレシピです'}</p>

                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        <span>{totalMinutes}分</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        difficulty === '簡単' ? 'bg-green-100 text-green-800' :
                        difficulty === '普通' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {difficulty}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      {selected ? (
                        <button
                          onClick={() => handleRemoveRecipe(recipe.id)}
                          className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
                        >
                          選択中
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddRecipe(recipe.id)}
                          className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
                        >
                          選択
                        </button>
                      )}
                      <button
                        onClick={() => router.push(`/recipes/${recipe.id}`)}
                        className="flex-1 border-2 border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
                      >
                        詳細
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
