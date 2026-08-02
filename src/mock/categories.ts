import type { CategoryId, CategoryMeta } from '@/types/article';

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'animals-nature',
    labelJa: '動物・自然',
    accent: '140 45% 36%',
    glyph: '🌿',
    blurb: '生きものと自然がくれる、小さな安らぎ',
  },
  {
    id: 'kindness',
    labelJa: '人のやさしさ',
    accent: '8 68% 45%',
    glyph: '🫶',
    blurb: 'だれかの思いやりに、こころが温まる話',
  },
  {
    id: 'bright-tech',
    labelJa: '未来が明るくなる技術',
    accent: '205 75% 43%',
    glyph: '💡',
    blurb: 'あしたが少し楽しみになる、技術の灯り',
  },
  {
    id: 'arts-culture',
    labelJa: 'アート・音楽・文化',
    accent: '275 45% 48%',
    glyph: '🎨',
    blurb: '創ること、奏でること。心がゆるむ表現',
  },
  {
    id: 'night-reads',
    labelJa: '夜に読む短いニュース',
    accent: '232 45% 48%',
    glyph: '🌙',
    blurb: 'おやすみ前に、ひとつだけ。短く明るく',
  },
];

const BY_ID = new Map<CategoryId, CategoryMeta>(
  CATEGORIES.map((category) => [category.id, category]),
);

export function getCategory(id: CategoryId): CategoryMeta {
  const category = BY_ID.get(id);
  if (!category) throw new Error(`Unknown category: ${id}`);
  return category;
}
