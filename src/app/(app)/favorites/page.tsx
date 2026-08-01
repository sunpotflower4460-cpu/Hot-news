'use client';

import Link from 'next/link';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { ArticleCard } from '@/components/article/ArticleCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
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
    <div className="pb-8">
      <ScreenHeader
        title="お気に入り"
        subtitle={
          hydrated && saved.length > 0
            ? `${saved.length}本の明るいニュース`
            : 'もう一度読みたい明るい出来事を、ここに'
        }
      />
      {!hydrated ? null : saved.length === 0 ? (
        <EmptyState
          glyph="🤍"
          title="まだ何もありません"
          description="気になったニュースのハートを押すと、ここにそっと集まります。"
          action={
            <Link href="/home">
              <Button variant="soft">ニュースをさがす</Button>
            </Link>
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
