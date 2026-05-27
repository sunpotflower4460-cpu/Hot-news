import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Article, CategoryMeta } from '@/types/article';
import { ArticleCard } from './ArticleCard';

interface CategoryRailProps {
  category: CategoryMeta;
  articles: Article[];
}

export function CategoryRail({ category, articles }: CategoryRailProps) {
  if (articles.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between px-5">
        <div>
          <h2 className="text-h2 font-bold text-text">
            <span aria-hidden className="mr-1">
              {category.glyph}
            </span>
            {category.labelJa}
          </h2>
          <p className="text-caption text-muted">{category.blurb}</p>
        </div>
        <Link
          href={`/browse/${category.id}`}
          className="flex shrink-0 items-center gap-0.5 text-caption font-medium text-accent"
        >
          もっと見る
          <ChevronRight size={14} />
        </Link>
      </div>
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-5 pb-1">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} layout="rail" />
        ))}
      </div>
    </section>
  );
}
