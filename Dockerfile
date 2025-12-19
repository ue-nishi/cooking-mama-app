# ベースとなるNode.js 18の環境を指定
FROM node:20-alpine

# コンテナ内の作業ディレクトリを作成
WORKDIR /app

# 依存関係のファイルを先にコピーして、ビルドを高速化する
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# プロジェクトのファイルを全てコピー
COPY . .

# Next.jsが使うポート番号3000番を公開
EXPOSE 3000

# 開発サーバーを起動するコマンド
CMD ["npm", "run", "dev"]