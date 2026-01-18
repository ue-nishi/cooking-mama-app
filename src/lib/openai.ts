import OpenAI from 'openai';
import type { Recipe } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * 複数レシピの調理手順を最適化
 */
export async function optimizeRecipeSteps(recipes: Recipe[]): Promise<string> {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-api-key') {
    throw new Error('OpenAI APIキーが設定されていません');
  }

  const recipeSummary = recipes.map((recipe, index) => {
    const ingredientsText = recipe.ingredients
      .map((ing) => `${ing.name}: ${ing.amount}${ing.unit || ''}`)
      .join(', ');
    
    const stepsText = recipe.steps
      .map((step) => `${step.stepNumber}. ${step.description}`)
      .join('\n');

    return `【レシピ${index + 1}: ${recipe.title}】\n材料: ${ingredientsText}\n手順:\n${stepsText}`;
  }).join('\n\n');

  const prompt = `以下の${recipes.length}つのレシピを同時に調理する場合の、最も効率的な手順を提案してください。
待ち時間を有効活用し、並行作業を考慮した最適化された手順を番号付きリストで出力してください。

${recipeSummary}

最適化された調理手順:`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'あなたは料理の専門家です。複数のレシピを同時に調理する際の効率的な手順を提案してください。',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return response.choices[0]?.message?.content || '最適化手順の生成に失敗しました';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('レシピ最適化中にエラーが発生しました');
  }
}
