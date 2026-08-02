import { Clock, MapPin } from 'lucide-react';
import type { Article } from '@/types/article';
import { relativeJa } from '@/lib/utils/date';
import { cn } from '@/lib/utils/cn';

interface ArticleMetaProps {
  article: Article;
  className?: string;
}

export function ArticleMeta({ article, className }: ArticleMetaProps) {
  return (
    <div
      aria-label="記事情報"
      className={cn('flex flex-wrap items-center gap-x-2.5 gap-y-1 text-caption text-muted', className)}
    >
      <span className="font-medium text-text/80">{article.sourceName}</span>
      <span aria-hidden>·</span>
      <time dateTime={article.appPublishedAt}>{relativeJa(article.appPublishedAt)}</time>
      <span className="inline-flex items-center gap-1">
        <MapPin aria-hidden size={12} />
        {article.region}
      </span>
      <span className="inline-flex items-center gap-1" aria-label={`読了目安 約${article.readingMinutes}分`}>
        <Clock aria-hidden size={12} />
        約{article.readingMinutes}分
      </span>
    </div>
  );
}
