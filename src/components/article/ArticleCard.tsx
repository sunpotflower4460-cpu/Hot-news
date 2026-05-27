import Link from 'next/link';
import type { Article } from '@/types/article';
import { CoverArt } from './CoverArt';
import { ComfortScore } from './ComfortScore';
import { SaveButton } from '@/components/favorites/SaveButton';
import { getCategory } from '@/mock/categories';
import { relativeJa } from '@/lib/utils/date';
import { cn } from '@/lib/utils/cn';

interface ArticleCardProps {
  article: Article;
  layout?: 'rail' | 'list';
}

export function ArticleCard({ article, layout = 'list' }: ArticleCardProps) {
  const primary = article.category[0];
  const meta = getCategory(primary);

  if (layout === 'rail') {
    return (
      <Link
        href={`/article/${article.id}`}
        className="group relative block w-60 shrink-0 overflow-hidden rounded-card border border-line/60 bg-surface shadow-soft transition-all duration-300 ease-gentle active:scale-[0.98] md:hover:-translate-y-0.5 md:hover:shadow-soft-lg"
      >
        <div className="relative">
          <CoverArt category={primary} seed={article.id} size="sm" className="h-28 w-full" />
          <SaveButton id={article.id} className="absolute right-2 top-2" />
        </div>
        <div className="space-y-2 p-3.5">
          <span className="text-[0.7rem] font-medium" style={{ color: `hsl(${meta.accent})` }}>
            {meta.glyph} {meta.labelJa}
          </span>
          <h3 className="line-clamp-2 text-body font-bold leading-snug text-text">{article.title}</h3>
          <div className="flex items-center justify-between pt-0.5">
            <ComfortScore score={article.comfortScore} showLabel={false} />
            <span className="text-[0.7rem] text-muted">{relativeJa(article.appPublishedAt)}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/article/${article.id}`}
      className="group flex gap-3.5 rounded-card border border-line/60 bg-surface p-3 shadow-soft transition-all duration-300 ease-gentle active:scale-[0.99] md:hover:-translate-y-0.5 md:hover:shadow-soft-lg"
    >
      <CoverArt
        category={primary}
        seed={article.id}
        size="sm"
        className="h-24 w-24 shrink-0 rounded-2xl"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-[0.7rem] font-medium" style={{ color: `hsl(${meta.accent})` }}>
          {meta.glyph} {meta.labelJa}
        </span>
        <h3 className={cn('mt-0.5 line-clamp-2 text-body font-bold leading-snug text-text')}>
          {article.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-caption text-muted">{article.summary}</p>
        <div className="mt-auto flex items-center justify-between pt-1.5">
          <ComfortScore score={article.comfortScore} showLabel={false} />
          <span className="text-[0.7rem] text-muted">{relativeJa(article.appPublishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
