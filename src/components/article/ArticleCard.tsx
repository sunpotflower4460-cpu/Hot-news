import Link from 'next/link';
import { SaveButton } from '@/components/favorites/SaveButton';
import { relativeJa } from '@/lib/utils/date';
import { getCategory } from '@/mock/categories';
import type { Article } from '@/types/article';
import { ComfortScore } from './ComfortScore';
import { CoverArt } from './CoverArt';

interface ArticleCardProps {
  article: Article;
  layout?: 'rail' | 'list';
}

export function ArticleCard({ article, layout = 'list' }: ArticleCardProps) {
  const primary = article.category[0];
  const meta = getCategory(primary);
  const brightnessScore = article.editorialAssessment?.brightnessScore ?? article.comfortScore;

  if (layout === 'rail') {
    return (
      <article className="soft-surface float-card group relative w-[17rem] shrink-0 rounded-card shadow-soft">
        <Link
          href={`/article/${article.id}`}
          aria-label={`${article.title}を読む`}
          className="block overflow-hidden rounded-card"
        >
          <CoverArt category={primary} seed={article.id} size="sm" className="h-36 w-full" />
          <div className="space-y-2.5 px-4 pb-4 pt-3.5">
            <span
              className="inline-flex items-center gap-1 rounded-pill bg-white/32 px-2.5 py-1 text-[0.68rem] font-semibold backdrop-blur-sm"
              style={{ color: `hsl(${meta.accent})` }}
            >
              <span aria-hidden>{meta.glyph}</span>
              {meta.labelJa}
            </span>
            <h3 className="line-clamp-2 text-[0.98rem] font-bold leading-[1.65] text-text">
              {article.title}
            </h3>
            <p className="line-clamp-2 text-caption text-muted">{article.summary}</p>
            <div className="flex items-center justify-between border-t border-line/35 pt-2.5">
              <ComfortScore score={brightnessScore} showLabel={false} />
              <time dateTime={article.appPublishedAt} className="text-[0.68rem] text-muted/80">
                {relativeJa(article.appPublishedAt)}
              </time>
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
    <Link
      href={`/article/${article.id}`}
      aria-label={`${article.title}を読む`}
      className="soft-surface float-card group flex gap-4 rounded-card p-3.5 shadow-soft"
    >
      <CoverArt
        category={primary}
        seed={article.id}
        size="sm"
        className="h-[6.75rem] w-[6.75rem] shrink-0 rounded-[1.4rem] shadow-inner-light"
      />
      <div className="flex min-w-0 flex-1 flex-col py-0.5">
        <span
          className="inline-flex items-center gap-1 text-[0.68rem] font-semibold"
          style={{ color: `hsl(${meta.accent})` }}
        >
          <span aria-hidden>{meta.glyph}</span>
          {meta.labelJa}
        </span>
        <h3 className="mt-1 line-clamp-2 text-[0.96rem] font-bold leading-[1.62] text-text">
          {article.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-caption leading-relaxed text-muted">
          {article.summary}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <ComfortScore score={brightnessScore} showLabel={false} />
          <time dateTime={article.appPublishedAt} className="text-[0.68rem] text-muted/75">
            {relativeJa(article.appPublishedAt)}
          </time>
        </div>
      </div>
    </Link>
  );
}
