// src/app/page.tsx

// アイコンをコンポーネントとして定義（Heroiconsなどから持ってくるのが一般的）
const ChefHatIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.378 1.602a.75.75 0 00-.756 0L3 7.232l9 4.923 9-4.923-8.622-5.63z" />
    <path fillRule="evenodd" d="M21 8.822a.75.75 0 01.386.651v6.204a.75.75 0 01-.628.742-24.08 24.08 0 01-17.516 0A.75.75 0 013 15.677V9.473a.75.75 0 01.386-.651l8.622-4.63L21 8.822zM4.5 14.323a22.57 22.57 0 0015 0v-3.64l-7.5 4.08-7.5-4.08v3.64z" clipRule="evenodd" />
    <path d="M12 19.5a.75.75 0 00.75-.75v-3a.75.75 0 00-1.5 0v3A.75.75 0 0012 19.5z" />
  </svg>
);

export default function LoginPage() {
  return (
    // 1. 全体レイアウト：画面全体を使い、中身を上下左右中央に配置
    <main className="flex min-h-screen items-center justify-center bg-orange-50">
      <div className="w-full max-w-md space-y-8">
        
        {/* 2. ヘッダーセクション */}
        <div className="flex flex-col items-center">
          <div className="mb-4 rounded-full bg-orange-500 p-4 text-white">
            <ChefHatIcon className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            レシピ手順最適化
          </h1>
          <p className="mt-2 text-gray-600">
            効率的な調理をサポートします
          </p>
        </div>

        {/* 3. フォームセクション */}
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <form className="space-y-6">
            
            {/* ユーザー名入力 */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                ユーザー名
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="ユーザー名を入力"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                />
              </div>
            </div>

            {/* パスワード入力 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                パスワード
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="パスワードを入力"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                />
              </div>
            </div>

            {/* ボタン */}
            <div className="space-y-4 pt-4">
              <button
                type="submit"
                className="w-full rounded-md bg-orange-500 px-4 py-2 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-orange-600"
              >
                ログイン
              </button>
              <button
                type="button"
                className="w-full rounded-md border-2 border-orange-500 px-4 py-2 text-lg font-semibold text-orange-500 shadow-sm transition-colors hover:bg-orange-50"
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