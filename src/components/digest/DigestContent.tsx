'use client';

import { BookOpenText, Sparkles } from 'lucide-react';
import { ArticleCard } from '@/components/article/ArticleCard';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { LinkButton } from '@/components/ui/LinkButton';
import { useI18n } from '@/lib/i18n/useI18n';
import type { Article, DigestWeek } from '@/types/article';

export function DigestContent({ digest, articles }: { digest: DigestWeek; articles: Article[] }) {
  const { locale, formatNumber } = useI18n();
  const weekLabel =
    locale === 'ja' ? digest.weekLabel : 'May 18–24, 2026';
  const intro =
    locale === 'ja'
      ? digest.intro
      : 'Bright things happened in many parts of the world this week. Here is a calm review of stories that passed our publication standard.';

  return (
    <div className="pb-10">
      <ScreenHeader
        title={locale === 'ja' ? '今週のまとめ' : 'This week'}
        subtitle={
          locale === 'ja'
            ? '一週間の明るい出来事を、まとめて振り返れます'
            : 'A calm look back at the week’s bright events'
        }
      />

      {articles.length === 0 ? (
        <EmptyState
          glyph="✨"
          title={locale === 'ja' ? '今週のまとめは準備中です' : 'This week’s collection is being prepared'}
          description={
            locale === 'ja'
              ? '掲載基準を満たすニュースがそろったら、ここに一週間分の光をまとめます。'
              : 'When enough stories meet our publication standard, we will gather the week’s bright moments here.'
          }
          action={
            <LinkButton href="/home" variant="soft">
              {locale === 'ja' ? '今日のニュースを見る' : "View today's stories"}
            </LinkButton>
          }
        />
      ) : (
        <>
          <section aria-labelledby="digest-intro-heading" className="px-5 pt-1">
            <div className="relative overflow-hidden rounded-panel border border-accent/10 bg-accent-soft/55 p-5 shadow-inner-light">
              <div
                aria-hidden
                className="absolute -right-10 -top-10 h-32 w-32 animate-breathe rounded-full bg-white/35 blur-3xl"
              />
              <div className="relative flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="mb-2 flex items-center gap-2 text-accent">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/40 shadow-inner-light">
                      <Sparkles aria-hidden size={15} />
                    </span>
                    <span className="text-caption font-bold tracking-wide">{weekLabel}</span>
                  </div>
                  <h1 id="digest-intro-heading" className="text-h2 font-bold text-text">
                    {locale === 'ja'
                      ? `今週の明るいニュース ${formatNumber(articles.length)}件`
                      : `${formatNumber(articles.length)} bright ${articles.length === 1 ? 'story' : 'stories'} this week`}
                  </h1>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/35 text-accent shadow-inner-light">
                  <BookOpenText aria-hidden size={18} />
                </span>
              </div>
              <p className="relative mt-2 text-body leading-relaxed text-text/90">{intro}</p>
            </div>
          </section>

          <section
            aria-label={locale === 'ja' ? '今週の明るいニュース一覧' : 'Bright stories from this week'}
            className="mt-5 space-y-3 px-5"
          >
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} layout="list" />
            ))}
          </section>

          <div className="px-5 pt-7">
            <p className="rounded-card bg-surface/55 px-4 py-3 text-center text-caption text-muted shadow-inner-light backdrop-blur-sm">
              {locale === 'ja'
                ? '来週も、世界に実在する明るい出来事を集めます。'
                : 'Next week, we will continue gathering genuinely bright events from the world.'}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
