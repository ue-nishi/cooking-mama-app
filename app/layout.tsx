import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cooking Mama App",
  description: "料理レシピと調理履歴を管理するアプリケーション",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
