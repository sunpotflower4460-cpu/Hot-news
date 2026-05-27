import { Sparkles } from 'lucide-react';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { ArticleCard } from '@/components/article/ArticleCard';
import { getArticlesByIds, getWeeklyDigest } from '@/lib/data/selectors';

export default async function DigestPage() {
  const digest = await getWeeklyDigest();
  const articles = await getArticlesByIds(digest.articleIds);

  return (
    <div className="animate-fade-up pb-8">
      <ScreenHeader title="週刊ほっとまとめ" />
      <div className="px-5 pt-1">
        <div className="rounded-card bg-accent-soft/70 p-5">
          <div className="mb-1.5 flex items-center gap-1.5 text-accent">
            <Sparkles size={16} className="fill-accent/30" />
            <span className="text-caption font-bold tracking-wide">{digest.weekLabel}</span>
          </div>
          <p className="text-body leading-relaxed text-text/90">{digest.intro}</p>
        </div>
      </div>
      <div className="mt-5 space-y-3 px-5">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} layout="list" />
        ))}
      </div>
      <p className="px-5 pt-6 text-center text-caption text-muted">
        来週も、やさしいお話を集めてお待ちしています。
      </p>
    </div>
  );
}
