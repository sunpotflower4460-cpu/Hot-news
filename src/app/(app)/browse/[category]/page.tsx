import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/article/ArticleCard';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { LinkButton } from '@/components/ui/LinkButton';
import { getArticlesByCategory } from '@/lib/data/selectors';
import { CATEGORIES, getCategory } from '@/mock/categories';
import type { CategoryId } from '@/types/article';

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.id }));
}

const VALID = new Set(CATEGORIES.map((category) => category.id));

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!VALID.has(category as CategoryId)) notFound();

  const meta = getCategory(category as CategoryId);
  const articles = await getArticlesByCategory(category as CategoryId);

  return (
    <div className="pb-10">
      <ScreenHeader title={`${meta.glyph} ${meta.labelJa}`} subtitle={meta.blurb} back />

      {articles.length === 0 ? (
        <EmptyState
          glyph={meta.glyph}
          title="いまは準備中です"
          description="掲載基準を満たす明るいニュースが見つかり次第、ここへそっと追加します。"
          action={
            <LinkButton href="/browse" variant="soft">
              ほかのテーマを見る
            </LinkButton>
          }
        />
      ) : (
        <section aria-labelledby="category-results-heading" className="px-5 pt-1">
          <div className="mb-3 flex items-center justify-between gap-3 px-1">
            <h2 id="category-results-heading" className="text-body font-bold text-text">
              掲載中のニュース
            </h2>
            <span className="rounded-pill bg-surface/60 px-3 py-1.5 text-[0.7rem] font-semibold text-muted shadow-inner-light">
              {articles.length}件
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
