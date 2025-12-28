# ベースとなるNode.js 18の環境を指定
FROM node:20-alpine

# コンテナ内の作業ディレクトリを作成
WORKDIR /app

# OpenSSLをインストール（Prisma Client用）
RUN apk add --no-cache openssl libc6-compat

# 依存関係のファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# プロジェクトのファイルを全てコピー
COPY . .

# Prisma Clientを生成
RUN npx prisma generate

# Next.jsが使うポート番号を公開
EXPOSE 3001

# シンプルに起動するだけ
CMD ["npm", "run", "dev"]