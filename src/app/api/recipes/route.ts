import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: recipes,
    });
  } catch (error) {
    console.error('Get recipes error:', error);
    return NextResponse.json(
      { success: false, error: 'レシピの取得に失敗しました' },
      { status: 500 }
    );
  }
}
