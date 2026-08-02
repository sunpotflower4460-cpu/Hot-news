'use client';

import { ArticleCard } from '@/components/article/ArticleCard';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { LinkButton } from '@/components/ui/LinkButton';
import { localizeCategory } from '@/lib/i18n/content';
import { useI18n } from '@/lib/i18n/useI18n';
import type { Article, CategoryMeta } from '@/types/article';

export function CategoryPageContent({
  category: rawCategory,
  articles,
}: {
  category: CategoryMeta;
  articles: Article[];
}) {
  const { locale, formatNumber } = useI18n();
  const category = localizeCategory(rawCategory, locale);

  return (
    <div className="pb-10">
      <ScreenHeader
        title={`${category.glyph} ${category.labelJa}`}
        subtitle={category.blurb}
        back
      />

      {articles.length === 0 ? (
        <EmptyState
          glyph={category.glyph}
          title={locale === 'ja' ? 'いまは準備中です' : 'More stories are coming'}
          description={
            locale === 'ja'
              ? '掲載基準を満たす明るいニュースが見つかり次第、ここへそっと追加します。'
              : 'We will add genuinely bright stories here as soon as they meet our publication standard.'
          }
          action={
            <LinkButton href="/browse" variant="soft">
              {locale === 'ja' ? 'ほかのテーマを見る' : 'Explore other topics'}
            </LinkButton>
          }
        />
      ) : (
        <section aria-labelledby="category-results-heading" className="px-5 pt-1">
          <div className="mb-3 flex items-center justify-between gap-3 px-1">
            <h2 id="category-results-heading" className="text-body font-bold text-text">
              {locale === 'ja' ? '掲載中のニュース' : 'Published stories'}
            </h2>
            <span className="rounded-pill bg-surface/60 px-3 py-1.5 text-[0.7rem] font-semibold text-muted shadow-inner-light">
              {locale === 'ja'
                ? `${formatNumber(articles.length)}件`
                : `${formatNumber(articles.length)} ${articles.length === 1 ? 'story' : 'stories'}`}
            </span>
          </div>
          <div className="space-y-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} layout="list" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
