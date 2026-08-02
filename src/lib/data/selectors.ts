import { getBrightnessRank, isArticleEligibleForPublication } from '@/lib/editorial/policy';
import { ARTICLES } from '@/mock/articles';
import { DIGEST } from '@/mock/digest';
import type { Article, CategoryId, DigestWeek } from '@/types/article';

/**
 * All reader-facing queries pass through one editorial publication gate.
 * Replacing the mock layer with a real API must preserve this contract.
 */

const TOKYO_DAY_FORMAT = new Intl.DateTimeFormat('en', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const byPublishedDesc = (a: Article, b: Article) =>
  new Date(b.appPublishedAt).getTime() - new Date(a.appPublishedAt).getTime();

const byBrightnessThenPublished = (a: Article, b: Article) =>
  getBrightnessRank(b) - getBrightnessRank(a) || byPublishedDesc(a, b);

const eligibleArticles = () => ARTICLES.filter(isArticleEligibleForPublication);

function tokyoDay(value: string | Date) {
  const parts = TOKYO_DAY_FORMAT.formatToParts(typeof value === 'string' ? new Date(value) : value);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((candidate) => candidate.type === type)?.value ?? '';
  return `${part('year')}-${part('month')}-${part('day')}`;
}

function isMockArticle(article: Article) {
  try {
    return new URL(article.sourceUrl).hostname === 'example.com';
  } catch {
    return false;
  }
}

export async function getAllArticles(): Promise<Article[]> {
  return eligibleArticles().sort(byPublishedDesc);
}

export async function getTodayHot3(now = new Date()): Promise<Article[]> {
  const eligible = eligibleArticles();
  const today = tokyoDay(now);
  let pool = eligible.filter((article) => tokyoDay(article.appPublishedAt) === today);

  // The fictional preview corpus is intentionally dated. For mock-only builds,
  // use its latest publication day so the UI remains reviewable. Real content
  // never falls back to old articles under a “today” heading.
  if (pool.length === 0 && eligible.length > 0 && eligible.every(isMockArticle)) {
    const latestDay = tokyoDay([...eligible].sort(byPublishedDesc)[0].appPublishedAt);
    pool = eligible.filter((article) => tokyoDay(article.appPublishedAt) === latestDay);
  }

  const highlighted = pool
    .filter((article) => article.isTodayHot)
    .sort(byBrightnessThenPublished);
  const fallback = pool
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
