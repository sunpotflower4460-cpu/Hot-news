import Link from 'next/link';
import { Sparkles } from 'lucide-react';
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
      <Link
        href={`/article/${article.id}`}
        aria-label={`${article.title}を読む`}
        className="block"
      >
        <CoverArt category={primary} seed={article.id} size="lg" className="h-[17.5rem] w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 space-y-2 p-5 text-white">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-pill border border-white/25 bg-white/20 px-3 py-1 text-[0.7rem] font-semibold shadow-inner-light backdrop-blur-md">
              <span aria-hidden>{meta.glyph}</span>
              {meta.labelJa}
            </span>
            <span className="inline-flex items-center gap-1 rounded-pill bg-black/10 px-2.5 py-1 text-[0.68rem] text-white/90 backdrop-blur-sm">
              <Sparkles aria-hidden size={11} />
              今日の光
            </span>
          </div>
          <h2 className="max-w-[23rem] text-[1.32rem] font-bold leading-[1.58] drop-shadow-sm">
            {article.title}
          </h2>
          <p className="line-clamp-2 max-w-[23rem] text-caption leading-relaxed text-white/85">
            {article.summary}
          </p>
          <div className="pt-1 [&_.text-line]:!text-white/35">
            <ComfortScore score={brightnessScore} showLabel={false} />
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
