import { BrowseContent } from '@/components/category/BrowseContent';
import { getArticlesByCategory } from '@/lib/data/selectors';
import { CATEGORIES } from '@/mock/categories';

export default async function BrowsePage() {
  const counts = await Promise.all(
    CATEGORIES.map(async (category) => (await getArticlesByCategory(category.id)).length),
  );

  return <BrowseContent categories={CATEGORIES} counts={counts} />;
}
