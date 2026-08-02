'use client';

import { useState } from 'react';
import { Bookmark, Clock3 } from 'lucide-react';
import { ArticleCard } from '@/components/article/ArticleCard';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { LinkButton } from '@/components/ui/LinkButton';
import { isArticleEligibleForPublication } from '@/lib/editorial/policy';
import { useFavoritesStore } from '@/lib/store/useFavoritesStore';
import { useReadingStore } from '@/lib/store/useReadingStore';
import { useHydrated } from '@/lib/utils/useHydrated';
import { cn } from '@/lib/utils/cn';
import { ARTICLES } from '@/mock/articles';
import type { Article } from '@/types/article';

type View = 'saved' | 'recent';

export default function FavoritesPage() {
  const hydrated = useHydrated();
  const [view, setView] = useState<View>('saved');
  const ids = useFavoritesStore((state) => state.ids);
  const readingEntries = useReadingStore((state) => state.entries);
  const eligible = ARTICLES.filter(isArticleEligibleForPublication);
  const map = new Map(eligible.map((article) => [article.id, article]));
  const saved = ids
    .map((id) => map.get(id))
    .filter((article): article is Article => article !== undefined);
  const recent = readingEntries
    .map((entry) => map.get(entry.id))
    .filter((article): article is Article => article !== undefined);
  const visible = view === 'saved' ? saved : recent;

  return (
    <div className="pb-10">
      <ScreenHeader
        title={view === 'saved' ? '保存したニュース' : '最近読んだニュース'}
        subtitle={
          view === 'saved'
            ? hydrated && saved.length > 0
              ? `${saved.length}件を保存しています`
              : 'あとでもう一度読みたい出来事を、ここに集めます'
            : hydrated && recent.length > 0
              ? `最近開いた${recent.length}件を、新しい順に表示しています`
              : '保存し忘れた記事も、ここから戻れます'
        }
      />

      <div className="px-5 pb-4">
        <div
          role="group"
          aria-label="保存したニュースと閲覧履歴を切り替える"
          className="grid grid-cols-2 gap-1 rounded-[1.35rem] border border-line/50 bg-surface-2/70 p-1 shadow-inner-light"
        >
          <ViewButton
            active={view === 'saved'}
            onClick={() => setView('saved')}
            Icon={Bookmark}
            label="保存"
            count={saved.length}
          />
          <ViewButton
            active={view === 'recent'}
            onClick={() => setView('recent')}
            Icon={Clock3}
            label="最近読んだ"
            count={recent.length}
          />
        </div>
      </div>

      {!hydrated ? (
        <div aria-label="ニュースを読み込み中" className="space-y-3 px-5 pt-2">
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
      ) : visible.length === 0 ? (
        <EmptyState
          glyph={view === 'saved' ? '🔖' : '🕊️'}
          title={
            view === 'saved' ? 'まだ保存したニュースはありません' : '最近読んだニュースはありません'
          }
          description={
            view === 'saved'
              ? '記事カードのブックマークを押すと、あとで読み返せるようここに保存されます。'
              : '記事を開くと、端末内だけに最近読んだ履歴が残ります。30日を過ぎると自動で消えます。'
          }
          action={
            <LinkButton href="/home" variant="soft">
              今日の3選を見る
            </LinkButton>
          }
        />
      ) : (
        <div className="space-y-3 px-5 pt-2">
          {visible.map((article) => (
            <ArticleCard key={article.id} article={article} layout="list" />
          ))}
        </div>
      )}
    </div>
  );
}

function ViewButton({
  active,
  onClick,
  Icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  Icon: typeof Bookmark;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex min-h-11 items-center justify-center gap-1.5 rounded-[1.05rem] px-3 text-caption font-bold transition-all duration-300 ease-gentle active:scale-95',
        active
          ? 'bg-surface text-accent shadow-soft'
          : 'text-muted hover:bg-surface/50 hover:text-text',
      )}
    >
      <Icon aria-hidden size={15} />
      {label}
      <span className="text-[0.68rem] opacity-75">{count}</span>
    </button>
  );
}
