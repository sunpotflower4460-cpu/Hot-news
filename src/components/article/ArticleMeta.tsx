import { MapPin, Clock } from 'lucide-react';
import { relativeJa } from '@/lib/utils/date';
import type { Article } from '@/types/article';
import { cn } from '@/lib/utils/cn';

interface ArticleMetaProps {
  article: Article;
  className?: string;
}

export function ArticleMeta({ article, className }: ArticleMetaProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-x-2.5 gap-y-1 text-caption text-muted', className)}>
      <span className="font-medium text-text/80">{article.sourceName}</span>
      <span aria-hidden>·</span>
      <span>{relativeJa(article.appPublishedAt)}</span>
      <span className="inline-flex items-center gap-0.5">
        <MapPin size={12} />
        {article.region}
      </span>
      <span className="inline-flex items-center gap-0.5">
        <Clock size={12} />
        約{article.readingMinutes}分
      </span>
    </div>
  );
}
