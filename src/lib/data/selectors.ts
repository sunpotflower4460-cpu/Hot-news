import { ARTICLES } from '@/mock/articles';
import { DIGEST } from '@/mock/digest';
import type { Article, CategoryId, DigestWeek } from '@/types/article';

/**
 * Async from day one so swapping the mock layer for the real AI-editorial API
 * later only changes this file — screens never touch the data source directly.
 */

const byPublishedDesc = (a: Article, b: Article) =>
  new Date(b.appPublishedAt).getTime() - new Date(a.appPublishedAt).getTime();

export async function getAllArticles(): Promise<Article[]> {
  return [...ARTICLES].sort(byPublishedDesc);
}

export async function getTodayHot3(): Promise<Article[]> {
  return ARTICLES.filter((a) => a.isTodayHot).slice(0, 3);
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  return ARTICLES.find((a) => a.id === id);
}

export async function getArticlesByIds(ids: string[]): Promise<Article[]> {
  const map = new Map(ARTICLES.map((a) => [a.id, a]));
  return ids.map((id) => map.get(id)).filter((a): a is Article => Boolean(a));
}

export async function getArticlesByCategory(category: CategoryId): Promise<Article[]> {
  return ARTICLES.filter((a) => a.category.includes(category)).sort(byPublishedDesc);
}

export async function getNightReads(): Promise<Article[]> {
  return ARTICLES.filter((a) => a.isNightRead).sort(byPublishedDesc);
}

export async function getWeeklyDigest(): Promise<DigestWeek> {
  return DIGEST;
}

/** Synchronous helpers for client components that already hold the corpus. */
export const allArticleIds = () => ARTICLES.map((a) => a.id);
