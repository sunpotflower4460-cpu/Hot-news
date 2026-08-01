import { Sparkles } from 'lucide-react';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { CategoryCard } from '@/components/category/CategoryCard';
import { CATEGORIES } from '@/mock/categories';
import { getArticlesByCategory } from '@/lib/data/selectors';

export default async function BrowsePage() {
  const counts = await Promise.all(
    CATEGORIES.map(async (category) => (await getArticlesByCategory(category.id)).length),
  );

  return (
    <div className="pb-10">
      <ScreenHeader title="さがす" subtitle="いまの気分に合う光を、ゆっくり選んで" />
      <div className="space-y-4 px-5 pt-1">
        <div className="rounded-card border border-white/40 bg-accent-soft/50 px-4 py-3.5 shadow-inner-light backdrop-blur-sm">
          <div className="flex items-center gap-2 text-accent">
            <Sparkles size={15} />
            <p className="text-caption font-bold">どの入口からでも、明るい出来事だけ</p>
          </div>
          <p className="mt-1 text-caption text-muted">
            動物、やさしさ、技術、文化。心が向くテーマからどうぞ。
          </p>
        </div>
        {CATEGORIES.map((category, index) => (
          <CategoryCard key={category.id} category={category} count={counts[index]} />
        ))}
      </div>
    </div>
  );
}
