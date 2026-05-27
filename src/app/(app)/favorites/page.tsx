'use client';

import Link from 'next/link';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { ArticleCard } from '@/components/article/ArticleCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { useFavoritesStore } from '@/lib/store/useFavoritesStore';
import { useHydrated } from '@/lib/utils/useHydrated';
import { ARTICLES } from '@/mock/articles';

export default function FavoritesPage() {
  const hydrated = useHydrated();
  const ids = useFavoritesStore((s) => s.ids);
  const map = new Map(ARTICLES.map((a) => [a.id, a]));
  const saved = ids.map((id) => map.get(id)).filter((a) => a !== undefined);

  return (
    <div className="animate-fade-up pb-8">
      <ScreenHeader
        title="お気に入り"
        subtitle={hydrated && saved.length > 0 ? `${saved.length}本の大切なお話` : 'もう一度読みたいお話を、ここに'}
      />
      {!hydrated ? null : saved.length === 0 ? (
        <EmptyState
          glyph="🤍"
          title="まだ何もありません"
          description="気になったお話のハートを押すと、ここにそっと集まります。"
          action={
            <Link href="/home">
              <Button variant="soft">お話をさがす</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3 px-5 pt-2">
          {saved.map((a) => (
            <ArticleCard key={a.id} article={a} layout="list" />
          ))}
        </div>
      )}
    </div>
  );
}
