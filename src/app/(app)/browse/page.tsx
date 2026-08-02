import Link from 'next/link';
import { ChevronRight, Sparkles } from 'lucide-react';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { CategoryCard } from '@/components/category/CategoryCard';
import { CATEGORIES } from '@/mock/categories';
import { getArticlesByCategory } from '@/lib/data/selectors';

export default async function BrowsePage() {
  const counts = await Promise.all(
    CATEGORIES.map(async (category) => (await getArticlesByCategory(category.id)).length),
  );
  const total = counts.reduce((sum, count) => sum + count, 0);

  return (
    <div className="pb-10">
      <ScreenHeader title="テーマから探す" subtitle="いまの気分に近い入口を選んでください" />

      <div className="space-y-5 px-5 pt-1">
        <section
          aria-label="掲載内容について"
          className="rounded-card border border-white/40 bg-accent-soft/50 px-4 py-3.5 shadow-inner-light backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 text-accent">
            <Sparkles aria-hidden size={15} />
            <p className="text-caption font-bold">どのテーマを選んでも、明るい出来事だけ</p>
          </div>
          <p className="mt-1 text-caption leading-relaxed text-muted">
            現在、{total}件の掲載基準を満たしたニュースがあります。
          </p>
        </section>

        <section aria-labelledby="category-list-heading" className="space-y-3">
          <div className="flex items-end justify-between gap-3 px-1">
            <div>
              <p className="text-[0.72rem] font-bold tracking-[0.08em] text-accent">テーマ一覧</p>
              <h2 id="category-list-heading" className="mt-1 text-h2 font-bold text-text">
                気になる分野から選ぶ
              </h2>
            </div>
            <span className="rounded-pill bg-surface/60 px-3 py-1.5 text-[0.7rem] font-semibold text-muted shadow-inner-light">
              {CATEGORIES.length}テーマ
            </span>
          </div>

          <div className="space-y-3">
            {CATEGORIES.map((category, index) => (
              <CategoryCard key={category.id} category={category} count={counts[index]} />
            ))}
          </div>
        </section>

        <Link
          href="/home"
          className="glass flex min-h-[4.5rem] items-center gap-3 rounded-card border px-4 py-3 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent shadow-inner-light">
            <Sparkles aria-hidden size={18} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-body font-bold text-text">迷ったら、今日の3選から</span>
            <span className="mt-0.5 block text-caption text-muted">
              編集部が選んだ3件へ戻ります
            </span>
          </span>
          <ChevronRight aria-hidden size={18} className="shrink-0 text-accent" />
        </Link>
      </div>
    </div>
  );
}
