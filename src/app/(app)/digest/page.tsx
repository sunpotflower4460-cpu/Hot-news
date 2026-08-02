import { DigestContent } from '@/components/digest/DigestContent';
import { getArticlesByIds, getWeeklyDigest } from '@/lib/data/selectors';

export default async function DigestPage() {
  const digest = await getWeeklyDigest();
  const articles = await getArticlesByIds(digest.articleIds);

  return <DigestContent digest={digest} articles={articles} />;
}
