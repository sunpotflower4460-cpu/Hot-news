import { notFound } from 'next/navigation';
import { CategoryPageContent } from '@/components/category/CategoryPageContent';
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

  return <CategoryPageContent category={meta} articles={articles} />;
}
