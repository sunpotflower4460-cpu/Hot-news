'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SaveButton } from '@/components/favorites/SaveButton';
import { localizeArticle } from '@/lib/i18n/articleTranslations';
import { localizeCategory } from '@/lib/i18n/content';
import { useI18n } from '@/lib/i18n/useI18n';
import { relativeTime } from '@/lib/utils/date';
import { getCategory } from '@/mock/categories';
import type { Article } from '@/types/article';
import { ComfortScore } from './ComfortScore';
import { CoverArt } from './CoverArt';

interface ArticleCardProps {
  article: Article;
  layout?: 'rail' | 'list';
}

export function ArticleCard({ article: rawArticle, layout = 'list' }: ArticleCardProps) {
  const { locale, t } = useI18n();
  const article = localizeArticle(rawArticle, locale);
  const primary = article.category[0];
  const meta = localizeCategory(getCategory(primary), locale);
  const brightnessScore = article.editorialAssessment?.brightnessScore ?? article.comfortScore;
  const readLabel = t('common.read');
  const articleLabel = locale === 'ja' ? `${article.title}を読む` : `Read “${article.title}”`;

  if (layout === 'rail') {
    return (
      <article className="soft-surface float-card group relative w-[16.5rem] shrink-0 rounded-card shadow-soft">
        <Link
          href={`/article/${article.id}`}
          aria-label={articleLabel}
          className="block overflow-hidden rounded-card"
        >
          <CoverArt category={primary} seed={article.id} size="sm" className="h-32 w-full" />
          <div className="space-y-2.5 px-4 pb-4 pt-3.5">
            <span
              className="inline-flex min-h-7 items-center gap-1 rounded-pill bg-white/32 px-2.5 text-[0.7rem] font-semibold backdrop-blur-sm"
              style={{ color: `hsl(${meta.accent})` }}
            >
              <span aria-hidden>{meta.glyph}</span>
              {meta.labelJa}
            </span>
            <h3 className="line-clamp-2 text-[0.98rem] font-bold leading-[1.62] text-text">
              {article.title}
            </h3>
            <p className="line-clamp-2 text-caption leading-relaxed text-muted">
              {article.summary}
            </p>
            <div className="flex items-center justify-between border-t border-line/35 pt-2.5">
              <ComfortScore score={brightnessScore} showLabel={false} />
              <span className="inline-flex items-center gap-0.5 text-[0.7rem] font-semibold text-accent">
                {readLabel}
                <ChevronRight aria-hidden size={13} />
              </span>
            </div>
          </div>
        </Link>
        <SaveButton
          id={article.id}
          articleTitle={article.title}
          className="absolute right-3 top-3 z-10 shadow-soft"
        />
      </article>
    );
  }

  return (
    <article className="soft-surface float-card group relative rounded-card shadow-soft">
      <Link
        href={`/article/${article.id}`}
        aria-label={articleLabel}
        className="flex min-h-[8.1rem] gap-3.5 rounded-card p-3.5 pr-[3.75rem]"
      >
        <CoverArt
          category={primary}
          seed={article.id}
          size="sm"
          className="h-[6.25rem] w-[6.25rem] shrink-0 self-center rounded-[1.35rem] shadow-inner-light"
        />
        <div className="flex min-w-0 flex-1 flex-col py-0.5">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className="inline-flex min-w-0 items-center gap-1 text-[0.7rem] font-semibold"
              style={{ color: `hsl(${meta.accent})` }}
            >
              <span aria-hidden>{meta.glyph}</span>
              <span className="truncate">{meta.labelJa}</span>
            </span>
            <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-line" />
            <time
              dateTime={article.appPublishedAt}
              className="shrink-0 text-[0.68rem] text-muted/80"
            >
              {relativeTime(article.appPublishedAt, locale)}
            </time>
          </div>

          <h3 className="mt-1 line-clamp-2 text-[0.96rem] font-bold leading-[1.58] text-text">
            {article.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-caption leading-relaxed text-muted">
            {article.summary}
          </p>

          <div className="mt-auto flex items-center justify-between gap-2 pt-1.5">
            <ComfortScore score={brightnessScore} showLabel={false} />
            <span className="inline-flex items-center gap-0.5 text-[0.7rem] font-semibold text-accent">
              {readLabel}
              <ChevronRight aria-hidden size={13} />
            </span>
          </div>
        </div>
      </Link>

      <SaveButton
        id={article.id}
        articleTitle={article.title}
        className="absolute right-2.5 top-2.5 z-10 shadow-soft"
      />
    </article>
  );
}
