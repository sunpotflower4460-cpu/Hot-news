import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { CategoryMeta } from '@/types/article';

export function CategoryCard({ category, count }: { category: CategoryMeta; count: number }) {
  return (
    <Link
      href={`/browse/${category.id}`}
      className="group relative flex items-center gap-4 overflow-hidden rounded-card border border-line/60 bg-surface p-4 shadow-soft transition-all duration-300 ease-gentle active:scale-[0.99] md:hover:-translate-y-0.5 md:hover:shadow-soft-lg"
    >
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl"
        style={{ backgroundColor: `hsl(${category.accent} / 0.16)` }}
      >
        {category.glyph}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-body font-bold text-text">{category.labelJa}</h3>
        <p className="line-clamp-1 text-caption text-muted">{category.blurb}</p>
        <span className="text-caption text-muted">{count}本のお話</span>
      </div>
      <ChevronRight size={18} className="shrink-0 text-muted" />
    </Link>
  );
}
