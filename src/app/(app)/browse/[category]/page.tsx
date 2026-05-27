import { notFound } from 'next/navigation';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { ArticleCard } from '@/components/article/ArticleCard';
import { CATEGORIES, getCategory } from '@/mock/categories';
import { getArticlesByCategory } from '@/lib/data/selectors';
import type { CategoryId } from '@/types/article';

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

const VALID = new Set(CATEGORIES.map((c) => c.id));

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!VALID.has(category as CategoryId)) notFound();

  const meta = getCategory(category as CategoryId);
  const articles = await getArticlesByCategory(category as CategoryId);

  return (
    <div className="pb-8">
      <ScreenHeader title={`${meta.glyph} ${meta.labelJa}`} subtitle={meta.blurb} back />
      <div className="space-y-3 px-5 pt-2">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} layout="list" />
        ))}
      </div>
    </div>
  );
}
