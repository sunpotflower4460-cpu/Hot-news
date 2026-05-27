import type { CategoryId, CategoryMeta } from '@/types/article';

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'animals-nature',
    labelJa: '動物・自然',
    accent: '140 45% 55%',
    glyph: '🌿',
    blurb: '生きものと自然がくれる、小さな安らぎ',
  },
  {
    id: 'kindness',
    labelJa: '人のやさしさ',
    accent: '8 80% 68%',
    glyph: '🫶',
    blurb: 'だれかの思いやりに、こころが温まる話',
  },
  {
    id: 'bright-tech',
    labelJa: '未来が明るくなる技術',
    accent: '205 80% 60%',
    glyph: '💡',
    blurb: 'あしたが少し楽しみになる、技術の灯り',
  },
  {
    id: 'arts-culture',
    labelJa: 'アート・音楽・文化',
    accent: '275 55% 65%',
    glyph: '🎨',
    blurb: '創ること、奏でること。心がゆるむ表現',
  },
  {
    id: 'night-reads',
    labelJa: '夜に読む短いニュース',
    accent: '232 45% 62%',
    glyph: '🌙',
    blurb: 'おやすみ前に、ひとつだけ。短くやさしく',
  },
];

const BY_ID = new Map<CategoryId, CategoryMeta>(CATEGORIES.map((c) => [c.id, c]));

export function getCategory(id: CategoryId): CategoryMeta {
  const c = BY_ID.get(id);
  if (!c) throw new Error(`Unknown category: ${id}`);
  return c;
}
