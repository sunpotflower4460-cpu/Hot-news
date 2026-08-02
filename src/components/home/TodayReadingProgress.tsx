'use client';

import Link from 'next/link';
import { Bookmark, Check, ChevronRight, Circle } from 'lucide-react';
import { useI18n } from '@/lib/i18n/useI18n';
import { useReadingStore } from '@/lib/store/useReadingStore';
import { useHydrated } from '@/lib/utils/useHydrated';

export function TodayReadingProgress({ articleIds }: { articleIds: string[] }) {
  const hydrated = useHydrated();
  const { locale, t } = useI18n();
  const entries = useReadingStore((state) => state.entries);
  const readIds = new Set(entries.map((entry) => entry.id));
  const total = articleIds.length;
  const readCount = hydrated ? articleIds.filter((id) => readIds.has(id)).length : 0;
  const complete = total > 0 && readCount === total;
  const remaining = total - readCount;

  if (total === 0) return null;

  const title = complete
    ? t('home.progressComplete')
    : locale === 'ja'
      ? `${t('home.progressTitle')}　${readCount} / ${total}件`
      : `${t('home.progressTitle')}: ${readCount} / ${total}`;
  const description = complete
    ? t('home.progressCompleteBody')
    : readCount === 0
      ? `${t('home.progressOneEnough')} ${
          locale === 'ja' ? '自分のペースでどうぞ。' : 'Read at your own pace.'
        }`
      : locale === 'ja'
        ? `あと${remaining}件あります。${t('home.progressCloseAnytime')}`
        : `${remaining} ${remaining === 1 ? 'story remains' : 'stories remain'}. ${t(
            'home.progressCloseAnytime',
          )}`;

  return (
    <aside
      aria-label={locale === 'ja' ? '今日のニュースの読了状況' : "Today's reading progress"}
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
          <p className="text-body font-bold text-text">{title}</p>
          <p className="mt-0.5 text-caption leading-relaxed text-muted">{description}</p>
        </div>
      </div>

      {complete && (
        <div className="relative mt-3 grid gap-2 sm:grid-cols-2">
          <Link
            href="/browse"
            className="flex min-h-11 items-center justify-center gap-1.5 rounded-pill bg-accent-strong px-4 text-caption font-bold text-white shadow-glow"
          >
            {t('home.more')}
            <ChevronRight aria-hidden size={14} />
          </Link>
          <Link
            href="/favorites"
            className="flex min-h-11 items-center justify-center gap-1.5 rounded-pill border border-line/60 bg-surface/75 px-4 text-caption font-bold text-text shadow-inner-light"
          >
            <Bookmark aria-hidden size={14} />
            {t('home.saved')}
          </Link>
        </div>
      )}
    </aside>
  );
}
