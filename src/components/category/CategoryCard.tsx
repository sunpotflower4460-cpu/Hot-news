import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { CategoryMeta } from '@/types/article';

export function CategoryCard({ category, count }: { category: CategoryMeta; count: number }) {
  return (
    <Link
      href={`/browse/${category.id}`}
      className="soft-surface float-card group relative flex items-center gap-4 rounded-card p-4 shadow-soft"
    >
      <div
        className="ambient-ring relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[1.45rem] text-[2rem] shadow-inner-light"
        style={{ backgroundColor: `hsl(${category.accent} / 0.17)` }}
      >
        <div className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-white/30 blur-md" />
        <span className="relative transition-transform duration-500 ease-gentle group-hover:scale-110 group-hover:-rotate-3">
          {category.glyph}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-[0.98rem] font-bold text-text">{category.labelJa}</h3>
        <p className="mt-0.5 line-clamp-2 text-caption text-muted">{category.blurb}</p>
        <span className="mt-1 inline-flex rounded-pill bg-surface/50 px-2 py-0.5 text-[0.68rem] font-medium text-muted/85">
          {count}本の明るいニュース
        </span>
      </div>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft/65 text-accent transition-transform duration-300 group-hover:translate-x-0.5">
        <ChevronRight size={17} />
      </span>
    </Link>
  );
}
