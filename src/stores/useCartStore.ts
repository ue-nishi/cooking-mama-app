'use client';

import { create } from 'zustand';

type CartStore = {
  selectedRecipeIds: number[];
  addRecipe: (recipeId: number) => boolean;
  removeRecipe: (recipeId: number) => void;
  clearCart: () => void;
  isRecipeSelected: (recipeId: number) => boolean;
};

export const useCartStore = create<CartStore>((set, get) => ({
  selectedRecipeIds: [],

  addRecipe: (recipeId: number) => {
    const { selectedRecipeIds } = get();
    
    // 既に選択済み
    if (selectedRecipeIds.includes(recipeId)) {
      return false;
    }
    
    // 最大3つまで
    if (selectedRecipeIds.length >= 3) {
      return false;
    }
    
    set({ selectedRecipeIds: [...selectedRecipeIds, recipeId] });
    return true;
  },

  removeRecipe: (recipeId: number) => {
    set((state) => ({
      selectedRecipeIds: state.selectedRecipeIds.filter((id) => id !== recipeId),
    }));
  },

  clearCart: () => {
    set({ selectedRecipeIds: [] });
  },

  isRecipeSelected: (recipeId: number) => {
    return get().selectedRecipeIds.includes(recipeId);
  },
}));
