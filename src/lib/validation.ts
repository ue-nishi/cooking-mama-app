import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
});

export const registerSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z
    .string()
    .min(8, 'パスワードは8文字以上で入力してください')
    .regex(/[A-Za-z]/, 'パスワードには英字を含めてください')
    .regex(/[0-9]/, 'パスワードには数字を含めてください'),
});

export const recipeSelectionSchema = z.object({
  recipeIds: z
    .array(z.number())
    .min(1, '少なくとも1つのレシピを選択してください')
    .max(3, 'レシピは最大3つまで選択できます'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type RecipeSelectionInput = z.infer<typeof recipeSelectionSchema>;
