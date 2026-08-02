import Link from 'next/link';
import { ChevronRight, Sparkles } from 'lucide-react';
import { SaveButton } from '@/components/favorites/SaveButton';
import { getCategory } from '@/mock/categories';
import type { Article } from '@/types/article';
import { ComfortScore } from './ComfortScore';
import { CoverArt } from './CoverArt';

export function HeroCard({ article }: { article: Article }) {
  const primary = article.category[0];
  const meta = getCategory(primary);
  const brightnessScore = article.editorialAssessment?.brightnessScore ?? article.comfortScore;

  return (
    <article className="soft-surface float-card group relative overflow-hidden rounded-panel shadow-soft-lg">
      <Link href={`/article/${article.id}`} aria-label={`${article.title}を読む`} className="block">
        <CoverArt category={primary} seed={article.id} size="lg" className="h-[15.75rem] w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />

        <div className="absolute inset-x-0 bottom-0 space-y-2.5 p-5 text-white">
          <div className="flex flex-wrap items-center gap-2 pr-12">
            <span className="inline-flex min-h-8 items-center gap-1.5 rounded-pill border border-white/25 bg-white/20 px-3 text-[0.72rem] font-semibold shadow-inner-light backdrop-blur-md">
              <span aria-hidden>{meta.glyph}</span>
              {meta.labelJa}
            </span>
            <span className="inline-flex min-h-8 items-center gap-1 rounded-pill bg-black/15 px-2.5 text-[0.7rem] font-semibold text-white/92 backdrop-blur-sm">
              <Sparkles aria-hidden size={12} />
              今日のおすすめ
            </span>
          </div>

          <h3 className="max-w-[23rem] text-[1.28rem] font-bold leading-[1.55] drop-shadow-sm">
            {article.title}
          </h3>
          <p className="line-clamp-2 max-w-[23rem] text-[0.82rem] leading-[1.7] text-white/88">
            {article.summary}
          </p>

          <div className="flex items-center justify-between gap-3 pt-0.5 [&_.text-line]:!text-white/35">
            <ComfortScore score={brightnessScore} showLabel={false} />
            <span className="inline-flex min-h-9 items-center gap-0.5 rounded-pill border border-white/20 bg-white/14 px-3 text-[0.74rem] font-semibold backdrop-blur-sm transition-colors group-hover:bg-white/22">
              記事を読む
              <ChevronRight aria-hidden size={14} />
            </span>
          </div>
        </div>

        <div
          aria-hidden
          className="absolute -left-1/3 top-0 h-full w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/15 to-transparent blur-sm"
        />
      </Link>

      <SaveButton
        id={article.id}
        articleTitle={article.title}
        className="absolute right-4 top-4 z-10 shadow-soft"
      />
    </article>
  );
}
