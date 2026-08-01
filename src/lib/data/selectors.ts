import { isArticleEligibleForPublication, getBrightnessRank } from '@/lib/editorial/policy';
import { ARTICLES } from '@/mock/articles';
import { DIGEST } from '@/mock/digest';
import type { Article, CategoryId, DigestWeek } from '@/types/article';

/**
 * All reader-facing queries pass through one editorial publication gate.
 * Replacing the mock layer with a real API must preserve this contract.
 */

const byPublishedDesc = (a: Article, b: Article) =>
  new Date(b.appPublishedAt).getTime() - new Date(a.appPublishedAt).getTime();

const byBrightnessThenPublished = (a: Article, b: Article) =>
  getBrightnessRank(b) - getBrightnessRank(a) || byPublishedDesc(a, b);

const eligibleArticles = () => ARTICLES.filter(isArticleEligibleForPublication);

export async function getAllArticles(): Promise<Article[]> {
  return eligibleArticles().sort(byPublishedDesc);
}

export async function getTodayHot3(): Promise<Article[]> {
  const eligible = eligibleArticles();
  const highlighted = eligible.filter((article) => article.isTodayHot).sort(byBrightnessThenPublished);
  const fallback = eligible
    .filter((article) => !article.isTodayHot)
    .sort(byBrightnessThenPublished);

  return [...highlighted, ...fallback].slice(0, 3);
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  return eligibleArticles().find((article) => article.id === id);
}

export async function getArticlesByIds(ids: string[]): Promise<Article[]> {
  const map = new Map(eligibleArticles().map((article) => [article.id, article]));
  return ids.map((id) => map.get(id)).filter((article): article is Article => Boolean(article));
}

export async function getArticlesByCategory(category: CategoryId): Promise<Article[]> {
  return eligibleArticles()
    .filter((article) => article.category.includes(category))
    .sort(byPublishedDesc);
}

export async function getNightReads(): Promise<Article[]> {
  return eligibleArticles()
    .filter((article) => article.isNightRead)
    .sort(byBrightnessThenPublished)
    .slice(0, 1);
}

export async function getWeeklyDigest(): Promise<DigestWeek> {
  const eligibleIds = new Set(eligibleArticles().map((article) => article.id));

  return {
    ...DIGEST,
    articleIds: DIGEST.articleIds.filter((id) => eligibleIds.has(id)),
  };
}

/** Synchronous helper for client components that already hold the corpus. */
export const allArticleIds = () => eligibleArticles().map((article) => article.id);
