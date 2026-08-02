import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { CategoryMeta } from '@/types/article';

export function CategoryCard({ category, count }: { category: CategoryMeta; count: number }) {
  const countLabel = count > 0 ? `${count}件` : '準備中';

  return (
    <Link
      href={`/browse/${category.id}`}
      aria-label={`${category.labelJa}のニュースを見る、${countLabel}`}
      className="soft-surface float-card group relative flex min-h-[6.5rem] items-center gap-4 rounded-card p-4 shadow-soft"
    >
      <div
        className="ambient-ring relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[1.45rem] text-[2rem] shadow-inner-light"
        style={{ backgroundColor: `hsl(${category.accent} / 0.17)` }}
      >
        <div
          aria-hidden
          className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-white/30 blur-md"
        />
        <span
          aria-hidden
          className="relative transition-transform duration-500 ease-gentle group-hover:-rotate-3 group-hover:scale-110"
        >
          {category.glyph}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[1rem] font-bold text-text">{category.labelJa}</h3>
          <span className="rounded-pill bg-surface/60 px-2 py-0.5 text-[0.68rem] font-bold text-muted shadow-inner-light">
            {countLabel}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-caption leading-relaxed text-muted">
          {category.blurb}
        </p>
      </div>

      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft/70 text-accent shadow-inner-light transition-transform duration-300 group-hover:translate-x-0.5">
        <ChevronRight aria-hidden size={18} />
      </span>
    </Link>
  );
}
