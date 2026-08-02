import { Sparkles, Sun } from 'lucide-react';
import { ArticleCard } from '@/components/article/ArticleCard';
import { CategoryRail } from '@/components/article/CategoryRail';
import { HeroCard } from '@/components/article/HeroCard';
import { HomeGreeting } from '@/components/home/HomeGreeting';
import { getArticlesByCategory, getTodayHot3 } from '@/lib/data/selectors';
import { CATEGORIES } from '@/mock/categories';

export default async function HomePage() {
  const hot3 = await getTodayHot3();
  const [hero, ...rest] = hot3;
  const rails = await Promise.all(
    CATEGORIES.map(async (category) => ({
      category,
      articles: (await getArticlesByCategory(category.id)).slice(0, 6),
    })),
  );

  return (
    <div className="space-y-10 pb-10">
      <HomeGreeting />

      <section aria-labelledby="today-light-heading" className="space-y-4 px-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-accent">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft shadow-inner-light">
                <Sun aria-hidden size={15} className="fill-accent/20" />
              </span>
              <p className="text-[0.7rem] font-bold tracking-[0.12em]">TODAY&apos;S LIGHT</p>
            </div>
            <h2 id="today-light-heading" className="mt-1.5 text-h2 font-bold text-text">
              今日の明るいニュース
            </h2>
            <p className="mt-0.5 text-caption text-muted">世界で見つけた、心を晴れ側へ戻す出来事</p>
          </div>
        </div>

        {hero ? (
          <>
            <HeroCard article={hero} />
            <div className="space-y-3.5 pt-0.5">
              {rest.map((article) => (
                <ArticleCard key={article.id} article={article} layout="list" />
              ))}
            </div>
          </>
        ) : (
          <div className="soft-surface rounded-panel px-6 py-8 text-center shadow-soft">
            <div className="ambient-ring mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/35 text-accent shadow-glow">
              <Sun aria-hidden size={28} strokeWidth={1.7} />
            </div>
            <p className="mt-4 font-rounded text-body-lg font-semibold text-text">
              今日のニュースを選んでいます
            </p>
            <p className="mx-auto mt-1 max-w-xs text-caption leading-relaxed text-muted">
              基準を満たす明るい出来事が見つかるまで、古い記事を「今日」として表示しません。
            </p>
          </div>
        )}
      </section>

      <div className="space-y-10">
        {rails.map(({ category, articles }) => (
          <CategoryRail key={category.id} category={category} articles={articles} />
        ))}
      </div>

      <div className="px-5 pt-1">
        <div className="soft-surface relative overflow-hidden rounded-panel px-6 py-7 text-center shadow-soft">
          <div className="absolute left-1/2 top-0 h-20 w-40 -translate-x-1/2 rounded-full bg-accent-soft/60 blur-2xl" />
          <Sparkles aria-hidden size={20} className="relative mx-auto text-accent" />
          <p className="relative mt-2 font-rounded text-body-lg font-medium text-text">
            世界には、今日も明るい出来事があります。
          </p>
          <p className="relative mt-1 text-caption text-muted">小さな光を、明日もここに集めます。</p>
        </div>
      </div>
    </div>
  );
}
