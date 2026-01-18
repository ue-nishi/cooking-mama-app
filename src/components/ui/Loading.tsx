'use client';

export function Loading({ text = '読み込み中...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      <p className="mt-4 text-gray-600">{text}</p>
    </div>
  );
}
