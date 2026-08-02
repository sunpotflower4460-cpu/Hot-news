'use client';

import { Clock, MapPin } from 'lucide-react';
import { localizeArticle } from '@/lib/i18n/articleTranslations';
import { useI18n } from '@/lib/i18n/useI18n';
import type { Article } from '@/types/article';
import { relativeTime } from '@/lib/utils/date';
import { cn } from '@/lib/utils/cn';

interface ArticleMetaProps {
  article: Article;
  className?: string;
}

export function ArticleMeta({ article: rawArticle, className }: ArticleMetaProps) {
  const { locale } = useI18n();
  const article = localizeArticle(rawArticle, locale);
  const readingLabel =
    locale === 'ja'
      ? `読了目安 約${article.readingMinutes}分`
      : `About ${article.readingMinutes} minute${article.readingMinutes === 1 ? '' : 's'} to read`;

  return (
    <div
      aria-label={locale === 'ja' ? '記事情報' : 'Article information'}
      className={cn(
        'flex flex-wrap items-center gap-x-2.5 gap-y-1 text-caption text-muted',
        className,
      )}
    >
      <span className="font-medium text-text/80">{article.sourceName}</span>
      <span aria-hidden>·</span>
      <time dateTime={article.appPublishedAt}>{relativeTime(article.appPublishedAt, locale)}</time>
      <span className="inline-flex items-center gap-1">
        <MapPin aria-hidden size={12} />
        {article.region}
      </span>
      <span className="inline-flex items-center gap-1" aria-label={readingLabel}>
        <Clock aria-hidden size={12} />
        {locale === 'ja' ? `約${article.readingMinutes}分` : `${article.readingMinutes} min`}
      </span>
    </div>
  );
}
