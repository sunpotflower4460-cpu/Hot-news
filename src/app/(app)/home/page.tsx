import { Sun } from 'lucide-react';
import { HomeGreeting } from '@/components/home/HomeGreeting';
import { HeroCard } from '@/components/article/HeroCard';
import { ArticleCard } from '@/components/article/ArticleCard';
import { CategoryRail } from '@/components/article/CategoryRail';
import { CATEGORIES } from '@/mock/categories';
import { getArticlesByCategory, getTodayHot3 } from '@/lib/data/selectors';

export default async function HomePage() {
  const hot3 = await getTodayHot3();
  const [hero, ...rest] = hot3;
  const rails = await Promise.all(
    CATEGORIES.map(async (c) => ({ category: c, articles: await getArticlesByCategory(c.id) })),
  );

  return (
    <div className="space-y-7 pb-8">
      <HomeGreeting />

      <section className="space-y-3 px-5">
        <div className="flex items-center gap-1.5 text-accent">
          <Sun size={16} className="fill-accent/30" />
          <h2 className="text-h2 font-bold text-text">今日のほっと</h2>
        </div>
        {hero && <HeroCard article={hero} />}
        <div className="space-y-3">
          {rest.map((a) => (
            <ArticleCard key={a.id} article={a} layout="list" />
          ))}
        </div>
      </section>

      {rails.map(({ category, articles }) => (
        <CategoryRail key={category.id} category={category} articles={articles} />
      ))}

      <p className="px-5 pt-2 text-center text-caption text-muted/80">
        今日も世界には、小さな灯りがありました。
      </p>
    </div>
  );
}
