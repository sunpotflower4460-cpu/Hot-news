import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { CategoryCard } from '@/components/category/CategoryCard';
import { CATEGORIES } from '@/mock/categories';
import { getArticlesByCategory } from '@/lib/data/selectors';

export default async function BrowsePage() {
  const counts = await Promise.all(
    CATEGORIES.map(async (c) => (await getArticlesByCategory(c.id)).length),
  );

  return (
    <div className="animate-fade-up pb-8">
      <ScreenHeader title="さがす" subtitle="気になるテーマから、ゆっくり選んで" />
      <div className="space-y-3 px-5 pt-2">
        {CATEGORIES.map((category, i) => (
          <CategoryCard key={category.id} category={category} count={counts[i]} />
        ))}
      </div>
    </div>
  );
}
