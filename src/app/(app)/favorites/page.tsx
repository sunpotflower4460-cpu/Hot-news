'use client';

import { ArticleCard } from '@/components/article/ArticleCard';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { LinkButton } from '@/components/ui/LinkButton';
import { isArticleEligibleForPublication } from '@/lib/editorial/policy';
import { useFavoritesStore } from '@/lib/store/useFavoritesStore';
import { useHydrated } from '@/lib/utils/useHydrated';
import { ARTICLES } from '@/mock/articles';
import type { Article } from '@/types/article';

export default function FavoritesPage() {
  const hydrated = useHydrated();
  const ids = useFavoritesStore((state) => state.ids);
  const eligible = ARTICLES.filter(isArticleEligibleForPublication);
  const map = new Map(eligible.map((article) => [article.id, article]));
  const saved = ids
    .map((id) => map.get(id))
    .filter((article): article is Article => article !== undefined);

  return (
    <div className="pb-10">
      <ScreenHeader
        title="保存したニュース"
        subtitle={
          hydrated && saved.length > 0
            ? `${saved.length}件を保存しています`
            : 'あとでもう一度読みたい出来事を、ここに集めます'
        }
      />

      {!hydrated ? (
        <div aria-label="保存したニュースを読み込み中" className="space-y-3 px-5 pt-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="soft-surface flex min-h-[8.1rem] animate-pulse gap-3.5 rounded-card p-3.5 shadow-soft"
            >
              <div className="h-[6.25rem] w-[6.25rem] shrink-0 self-center rounded-[1.35rem] bg-surface-2/80" />
              <div className="flex flex-1 flex-col gap-2 py-1 pr-8">
                <div className="h-3 w-20 rounded-pill bg-accent-soft/75" />
                <div className="h-4 w-full rounded-pill bg-surface-2" />
                <div className="h-4 w-4/5 rounded-pill bg-surface-2" />
                <div className="mt-auto h-3 w-24 rounded-pill bg-surface-2/80" />
              </div>
            </div>
          ))}
        </div>
      ) : saved.length === 0 ? (
        <EmptyState
          glyph="🤍"
          title="まだ保存したニュースはありません"
          description="記事カードのハートを押すと、あとで読み返せるようここに保存されます。"
          action={
            <LinkButton href="/home" variant="soft">
              今日の3選を見る
            </LinkButton>
          }
        />
      ) : (
        <div className="space-y-3 px-5 pt-2">
          {saved.map((article) => (
            <ArticleCard key={article.id} article={article} layout="list" />
          ))}
        </div>
      )}
    </div>
  );
}
