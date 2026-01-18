// Prismaモデルに対応する型定義

export type Ingredient = {
  name: string;
  amount: string;
  unit?: string;
};

export type RecipeStep = {
  stepNumber: number;
  description: string;
  estimatedMinutes?: number;
};

export type Recipe = {
  id: number;
  title: string;
  imageUrl?: string;
  description?: string;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CookingHistory = {
  id: number;
  userId: number;
  optimizedSteps: string | null;
  createdAt: Date;
  recipes?: Recipe[];
};

export type SessionData = {
  userId: number;
  email: string;
  isLoggedIn: boolean;
};

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};
