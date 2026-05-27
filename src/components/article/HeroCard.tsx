import Link from 'next/link';
import type { Article } from '@/types/article';
import { CoverArt } from './CoverArt';
import { ComfortScore } from './ComfortScore';
import { SaveButton } from '@/components/favorites/SaveButton';
import { getCategory } from '@/mock/categories';

export function HeroCard({ article }: { article: Article }) {
  const primary = article.category[0];
  const meta = getCategory(primary);

  return (
    <Link
      href={`/article/${article.id}`}
      className="group relative block overflow-hidden rounded-card shadow-soft-lg transition-transform active:scale-[0.99]"
    >
      <CoverArt category={primary} seed={article.id} size="lg" className="h-52 w-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
      <SaveButton id={article.id} className="absolute right-3 top-3" />
      <div className="absolute inset-x-0 bottom-0 space-y-1.5 p-4 text-white">
        <span className="inline-flex items-center gap-1 rounded-pill bg-white/20 px-2.5 py-1 text-[0.7rem] font-medium backdrop-blur">
          {meta.glyph} {meta.labelJa}
        </span>
        <h2 className="text-h2 font-bold leading-snug drop-shadow-sm">{article.title}</h2>
        <p className="line-clamp-2 text-caption text-white/85">{article.summary}</p>
        <div className="pt-0.5 [&_.text-line]:!text-white/40">
          <ComfortScore score={article.comfortScore} showLabel={false} />
        </div>
      </div>
    </Link>
  );
}
