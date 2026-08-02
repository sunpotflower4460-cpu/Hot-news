import { Sparkles } from 'lucide-react';
import { ArticleCard } from '@/components/article/ArticleCard';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { LinkButton } from '@/components/ui/LinkButton';
import { getArticlesByIds, getWeeklyDigest } from '@/lib/data/selectors';

export default async function DigestPage() {
  const digest = await getWeeklyDigest();
  const articles = await getArticlesByIds(digest.articleIds);

  return (
    <div className="pb-10">
      <ScreenHeader title="週刊ライトまとめ" subtitle="一週間の明るい出来事を、ゆっくり振り返る" />

      {articles.length === 0 ? (
        <EmptyState
          glyph="✨"
          title="今週のまとめは準備中です"
          description="掲載基準を満たすニュースがそろったら、ここに一週間分の光をまとめます。"
          action={
            <LinkButton href="/home" variant="soft">
              今日のニュースを見る
            </LinkButton>
          }
        />
      ) : (
        <>
          <div className="px-5 pt-1">
            <div className="relative overflow-hidden rounded-panel border border-accent/10 bg-accent-soft/55 p-5 shadow-inner-light">
              <div className="absolute -right-10 -top-10 h-32 w-32 animate-breathe rounded-full bg-white/35 blur-3xl" />
              <div className="relative mb-2 flex items-center gap-2 text-accent">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/40 shadow-inner-light">
                  <Sparkles size={15} />
                </span>
                <span className="text-caption font-bold tracking-wide">{digest.weekLabel}</span>
              </div>
              <p className="relative text-body leading-relaxed text-text/90">{digest.intro}</p>
            </div>
          </div>
          <div className="mt-5 space-y-3.5 px-5">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} layout="list" />
            ))}
          </div>
          <div className="px-5 pt-7">
            <p className="rounded-card bg-surface/55 px-4 py-3 text-center text-caption text-muted shadow-inner-light backdrop-blur-sm">
              来週も、世界に実在する明るい出来事を集めます。
            </p>
          </div>
        </>
      )}
    </div>
  );
}
