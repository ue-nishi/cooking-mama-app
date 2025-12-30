# Cooking Mama App

料理レシピと調理履歴を管理するアプリケーション

## 技術スタック

- **フロントエンド**: Next.js 16.1.0, React 19, TypeScript
- **バックエンド**: Next.js API Routes
- **データベース**: MySQL 8.0, Prisma
- **スタイリング**: Tailwind CSS 4
- **コンテナ**: Docker & Docker Compose

## 環境構築手順（Docker環境のみ）

### 前提条件

**Docker Desktopのみ**がインストールされていればOKです！

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Node.jsやnpmのインストールは**不要**です。

### 起動方法（2ステップ）

```bash
# 1. リポジトリをクローン
git clone <repository-url>
cd cooking-mama-app

# 2. Dockerコンテナをビルド・起動
docker-compose up --build
```

**初回起動は5-10分程度かかります**

起動完了後、ブラウザで **http://localhost:3001** を開いてください。

### 停止方法

```bash
# Ctrl+C で停止、または
docker-compose down
```

## よく使うコマンド

### 基本操作

```bash
# コンテナを起動（2回目以降）
docker-compose up

# バックグラウンドで起動
docker-compose up -d

# コンテナを停止
docker-compose down

# データベースも削除
docker-compose down -v

# データベースをリセット
npm run db:reset
```

### データベース操作

```bash
# Prisma Studio起動（GUIでデータ管理）
npm run db:studio
# ブラウザで http://localhost:5555 を開く

# MySQLに直接接続
docker-compose exec db mysql -u root -ppassword cooking_mama

# テーブル一覧を確認
docker-compose exec db mysql -u root -ppassword cooking_mama -e "SHOW TABLES;"

# Prisma Clientを再生成
npm run prisma:generate
```

### ログ確認

```bash
# 全体のログ
docker-compose logs -f

# アプリのログのみ
docker-compose logs -f app

# データベースのログのみ
docker-compose logs -f db
```

## データベース情報

### テーブル構成

| テーブル名 | 説明 |
|:---|:---|
| `users` | ユーザー情報 |
| `recipes` | レシピ情報 |
| `cooking_histories` | 調理履歴 |
| `history_recipes` | 履歴とレシピの中間テーブル |

### 外部ツールから接続

TablePlus、DBeaver等から接続する場合：

- Host: `localhost`
- Port: `3307`
- Database: `cooking_mama`
- User: `root`
- Password: `password`

## データの追加方法

### 方法1: Prisma Studio（推奨）

```bash
npm run db:studio
```

ブラウザで `http://localhost:5555` を開き、GUIで簡単にデータを追加・編集できます。

### 方法2: MySQLで直接SQL実行

```bash
docker-compose exec db mysql -u root -ppassword cooking_mama
```

```sql
-- ユーザーを追加
INSERT INTO users (email, password, created_at, updated_at) 
VALUES ('test@example.com', '$2a$10$hashedpassword', NOW(), NOW());

-- レシピを追加
INSERT INTO recipes (title, description, ingredients, steps, created_at, updated_at)
VALUES (
  'カレーライス',
  '定番のカレーライス',
  '["豚肉", "玉ねぎ", "じゃがいも", "にんじん", "カレールー"]',
  '["肉を切る", "野菜を切る", "炒める", "煮込む"]',
  NOW(),
  NOW()
);
```

## トラブルシューティング

### ポート3001が既に使用されている場合

`docker-compose.yml`の`app`サービスのポート設定を変更：
```yaml
ports:
  - "3002:3001"  # 左側を別のポート番号に変更
```

### ポート3307（MySQL）が既に使用されている場合

`docker-compose.yml`の`db`サービスのポート設定を変更：
```yaml
ports:
  - "3308:3306"  # 左側を別のポート番号に変更
```

### データベースに接続できない場合

```bash
# コンテナが起動しているか確認
docker-compose ps

# データベースのログを確認
docker-compose logs db

# 完全にクリーンアップして再構築
docker-compose down -v
docker-compose up --build
```

### Prisma Studioが起動しない場合

```bash
# コンテナを再起動
docker-compose restart app

# Prisma Clientを再生成
npm run prisma:generate

# 再度起動
npm run db:studio
```

## 参考資料

- [Next.js](https://nextjs.org/docs)
- [Prisma](https://www.prisma.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [データベースクエリ集](./docs/database-queries.md)
- [画面設計](./docs/screen-flow.md)
