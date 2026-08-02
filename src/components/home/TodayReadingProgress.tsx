'use client';

import Link from 'next/link';
import { Bookmark, Check, ChevronRight, Circle } from 'lucide-react';
import { useReadingStore } from '@/lib/store/useReadingStore';
import { useHydrated } from '@/lib/utils/useHydrated';

export function TodayReadingProgress({ articleIds }: { articleIds: string[] }) {
  const hydrated = useHydrated();
  const entries = useReadingStore((state) => state.entries);
  const readIds = new Set(entries.map((entry) => entry.id));
  const total = articleIds.length;
  const readCount = hydrated ? articleIds.filter((id) => readIds.has(id)).length : 0;
  const complete = total > 0 && readCount === total;

  if (total === 0) return null;

  return (
    <aside
      aria-label="今日のニュースの読了状況"
      className={
        complete
          ? 'relative overflow-hidden rounded-card border border-accent/12 bg-accent-soft/60 px-4 py-4 shadow-inner-light'
          : 'glass rounded-card border px-4 py-3.5 shadow-soft'
      }
    >
      {complete && (
        <div
          aria-hidden
          className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/40 blur-2xl"
        />
      )}

      <div className="relative flex items-center gap-3">
        <div className="flex shrink-0 items-center gap-1" aria-hidden>
          {articleIds.map((id) =>
            readIds.has(id) ? (
              <span
                key={id}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-strong text-white shadow-glow"
              >
                <Check size={14} strokeWidth={2.5} />
              </span>
            ) : (
              <span
                key={id}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-line/70 bg-surface/70 text-muted"
              >
                <Circle size={10} />
              </span>
            ),
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-body font-bold text-text">
            {complete ? '今日の3選はここまでです' : `今日の3選　${readCount} / ${total}件`}
          </p>
          <p className="mt-0.5 text-caption leading-relaxed text-muted">
            {complete
              ? '世界には、今日も静かに前へ進んでいる出来事がありました。'
              : readCount === 0
                ? '一件だけでも大丈夫です。自分のペースでどうぞ。'
                : `あと${total - readCount}件あります。ここで閉じても大丈夫です。`}
          </p>
        </div>
      </div>

      {complete && (
        <div className="relative mt-3 grid gap-2 sm:grid-cols-2">
          <Link
            href="/browse"
            className="flex min-h-11 items-center justify-center gap-1.5 rounded-pill bg-accent-strong px-4 text-caption font-bold text-white shadow-glow"
          >
            もう少し見る
            <ChevronRight aria-hidden size={14} />
          </Link>
          <Link
            href="/favorites"
            className="flex min-h-11 items-center justify-center gap-1.5 rounded-pill border border-line/60 bg-surface/75 px-4 text-caption font-bold text-text shadow-inner-light"
          >
            <Bookmark aria-hidden size={14} />
            保存したニュース
          </Link>
        </div>
      )}
    </aside>
  );
}
