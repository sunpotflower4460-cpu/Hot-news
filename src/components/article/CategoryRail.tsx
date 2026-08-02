'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { localizeCategory } from '@/lib/i18n/content';
import { useI18n } from '@/lib/i18n/useI18n';
import type { Article, CategoryMeta } from '@/types/article';
import { ArticleCard } from './ArticleCard';

interface CategoryRailProps {
  category: CategoryMeta;
  articles: Article[];
}

export function CategoryRail({ category: rawCategory, articles }: CategoryRailProps) {
  const { locale, t } = useI18n();
  const category = localizeCategory(rawCategory, locale);
  if (articles.length === 0) return null;

  const headingId = `category-${category.id}`;

  return (
    <section aria-labelledby={headingId} className="space-y-4">
      <div className="flex items-end justify-between gap-4 px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.15rem] border border-white/45 text-xl shadow-inner-light"
            style={{ backgroundColor: `hsl(${category.accent} / 0.16)` }}
          >
            {category.glyph}
          </span>
          <div className="min-w-0">
            <h2 id={headingId} className="text-h2 font-bold text-text">
              {category.labelJa}
            </h2>
            <p className="truncate text-caption text-muted">{category.blurb}</p>
          </div>
        </div>
        <Link
          href={`/browse/${category.id}`}
          aria-label={
            locale === 'ja'
              ? `${category.labelJa}をすべて見る`
              : `View all stories in ${category.labelJa}`
          }
          className="flex min-h-11 shrink-0 items-center gap-0.5 rounded-pill bg-surface/45 px-3 text-caption font-semibold text-accent backdrop-blur transition-all duration-300 hover:bg-accent-soft active:scale-95"
        >
          {t('common.viewAll')}
          <ChevronRight aria-hidden size={14} />
        </Link>
      </div>
      <ul className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 pt-0.5 [scroll-padding-inline:1.25rem]">
        {articles.map((article) => (
          <li key={article.id} className="snap-start">
            <ArticleCard article={article} layout="rail" />
          </li>
        ))}
      </ul>
    </section>
  );
}
