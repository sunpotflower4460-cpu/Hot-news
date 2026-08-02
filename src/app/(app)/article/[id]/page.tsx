import { notFound } from 'next/navigation';
import { ArticleDetailContent } from '@/components/article/ArticleDetailContent';
import { getArticleById, getArticlesByCategory } from '@/lib/data/selectors';
import { isArticleEligibleForPublication } from '@/lib/editorial/policy';
import { ARTICLES } from '@/mock/articles';

export function generateStaticParams() {
  return ARTICLES.filter(isArticleEligibleForPublication).map((article) => ({ id: article.id }));
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();

  const primary = article.category[0];
  const related = (await getArticlesByCategory(primary))
    .filter((candidate) => candidate.id !== article.id)
    .slice(0, 6);

  return <ArticleDetailContent article={article} related={related} />;
}
