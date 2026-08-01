import { Sparkles, Sun } from 'lucide-react';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { ArticleCard } from '@/components/article/ArticleCard';
import { getArticlesByIds, getWeeklyDigest } from '@/lib/data/selectors';

export default async function DigestPage() {
  const digest = await getWeeklyDigest();
  const articles = await getArticlesByIds(digest.articleIds);

  return (
    <div className="pb-10">
      <ScreenHeader title="今週の光まとめ" subtitle="一週間ぶんの明るい出来事を、ひと息で" />
      <div className="px-5 pt-1">
        <div className="soft-surface relative overflow-hidden rounded-panel p-5 shadow-float">
          <div className="absolute -right-8 -top-10 h-32 w-32 animate-breathe rounded-full bg-accent-soft/75 blur-2xl" />
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent shadow-inner-light">
            <Sun size={21} className="fill-accent/15" />
          </div>
          <div className="relative mt-3 flex items-center gap-1.5 text-accent">
            <Sparkles size={14} />
            <span className="text-caption font-bold tracking-wide">{digest.weekLabel}</span>
          </div>
          <p className="relative mt-2 text-body leading-[1.9] text-text/90">{digest.intro}</p>
        </div>
      </div>
      <div className="mt-6 space-y-3.5 px-5">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} layout="list" />
        ))}
      </div>
      <div className="px-5 pt-8">
        <p className="rounded-pill bg-surface/45 px-4 py-2.5 text-center text-caption text-muted backdrop-blur-sm">
          来週も、世界の明るい出来事を集めてお待ちしています。
        </p>
      </div>
    </div>
  );
}
