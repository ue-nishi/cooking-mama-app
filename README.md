# Cooking Mama App

料理レシピと調理履歴を管理するアプリケーション

## 技術スタック

- **フロントエンド**: Next.js 16.1.0, React 19, TypeScript
- **バックエンド**: Next.js API Routes, NextAuth.js
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

```bash
# コンテナを起動（2回目以降）
docker-compose up

# バックグラウンドで起動
docker-compose up -d

# コンテナを停止
docker-compose down

# データベースも削除
docker-compose down -v

# ログ確認
docker-compose logs -f app

# Prisma Studioを起動
docker-compose exec app npx prisma studio

# MySQLに接続
docker-compose exec db mysql -u root -ppassword cooking_mama
```

## データベース情報

外部ツールから接続する場合：

- Host: `localhost`
- Port: `3307`
- Database: `cooking_mama`
- User: `root`
- Password: `password`

## トラブルシューティング

```bash
# 完全にクリーンアップ
docker-compose down -v
docker system prune -a

# 再ビルド
docker-compose up --build
```

## 参考資料

- [Next.js](https://nextjs.org/docs)
- [NextAuth.js](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/docs/)
- [データベースクエリ集](./docs/database-queries.md)
