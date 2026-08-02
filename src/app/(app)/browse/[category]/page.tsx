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
        <div className="space-y-3.5 px-5 pt-2">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} layout="list" />
          ))}
        </div>
      )}
    </div>
  );
}
