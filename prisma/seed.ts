import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // テストユーザー作成
  const hashedPassword = await bcrypt.hash('test1234', 10);
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: hashedPassword,
    },
  });
  console.log('✅ Test user created:', user.email);

  // レシピ作成
  const recipes = await Promise.all([
    prisma.recipe.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: 'レシピA',
        description: '簡単なレシピA',
        imageUrl: null,
        ingredients: [
          { name: '材料A1', amount: '100', unit: 'g' },
          { name: '材料A2', amount: '2', unit: '個' },
        ],
        steps: [
          { stepNumber: 1, description: 'A1を準備する', estimatedMinutes: 5 },
          { stepNumber: 2, description: 'A2を切る', estimatedMinutes: 3 },
          { stepNumber: 3, description: '炒める', estimatedMinutes: 10 },
        ],
      },
    }),
    prisma.recipe.upsert({
      where: { id: 2 },
      update: {},
      create: {
        title: 'レシピB',
        description: '簡単なレシピB',
        imageUrl: null,
        ingredients: [
          { name: '材料B1', amount: '200', unit: 'ml' },
          { name: '材料B2', amount: '1', unit: '本' },
          { name: '材料B3', amount: '50', unit: 'g' },
        ],
        steps: [
          { stepNumber: 1, description: 'B1を温める', estimatedMinutes: 5 },
          { stepNumber: 2, description: 'B2を加える', estimatedMinutes: 2 },
          { stepNumber: 3, description: '煮込む', estimatedMinutes: 15 },
          { stepNumber: 4, description: '味を整える', estimatedMinutes: 3 },
        ],
      },
    }),
    prisma.recipe.upsert({
      where: { id: 3 },
      update: {},
      create: {
        title: 'レシピC',
        description: '簡単なレシピC',
        imageUrl: null,
        ingredients: [
          { name: '材料C1', amount: '150', unit: 'g' },
          { name: '材料C2', amount: '3', unit: '枚' },
        ],
        steps: [
          { stepNumber: 1, description: 'C1を混ぜる', estimatedMinutes: 5 },
          { stepNumber: 2, description: 'C2を並べる', estimatedMinutes: 3 },
          { stepNumber: 3, description: 'オーブンで焼く', estimatedMinutes: 20 },
        ],
      },
    }),
  ]);
  console.log(`✅ ${recipes.length} recipes created`);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
