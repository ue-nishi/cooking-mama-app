import { getIronSession, IronSession } from 'iron-session';
import { cookies } from 'next/headers';
import type { SessionData } from '@/types';

export const sessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'cooking_mama_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600, // 1時間
  },
};

/**
 * セッションを取得
 */
export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

/**
 * ログイン中のユーザー情報を取得
 */
export async function getCurrentUser(): Promise<SessionData | null> {
  const session = await getSession();
  
  if (!session.isLoggedIn) {
    return null;
  }
  
  return {
    userId: session.userId,
    email: session.email,
    isLoggedIn: session.isLoggedIn,
  };
}
