import type { Article, ArticleProvenance, EditorialAssessment } from '@/types/article';

export const BRIGHT_NEWS_POLICY_VERSION = 'bright-news-v1' as const;

export const BRIGHT_NEWS_THRESHOLDS = {
  brightnessScore: 75,
  emotionalSafetyScore: 70,
  hopeScore: 65,
  positiveChangeScore: 55,
  darkContextRatio: 25,
  reliabilityScore: 70,
} as const;

/**
 * Temporary guard for the fictional mock corpus only. Real articles without a
 * structured editorial assessment and provenance are always rejected.
 */
const LEGACY_DARK_CONTEXT_TERMS = [
  '骨折',
  '立ち往生',
  '迷子',
  '廃校',
  '被災',
  '災害',
  '救急',
  '弱った',
  '最後まで',
  '失語症',
  '病気',
  '保護された',
  'あきらめていた',
  'もうだめかと思った',
] as const;

function isPublishedStatus(article: Article) {
  return article.status === 'PUBLISHED' || article.status === 'SAFE_SHORT_VERSION';
}

function isMockArticle(article: Article) {
  try {
    return new URL(article.sourceUrl).hostname === 'example.com';
  } catch {
    return false;
  }
}

function isValidDate(value: string) {
  return Number.isFinite(Date.parse(value));
}

export function isSafeSourceUrl(value: string) {
  try {
    const url = new URL(value);
    return (
      url.protocol === 'https:' &&
      Boolean(url.hostname) &&
      !url.username &&
      !url.password &&
      !['localhost', '127.0.0.1', '0.0.0.0', '::1'].includes(url.hostname.toLowerCase())
    );
  } catch {
    return false;
  }
}

function isArticleShapeSafe(article: Article) {
  return (
    article.id.trim().length > 0 &&
    article.title.trim().length > 0 &&
    article.summary.trim().length > 0 &&
    article.sourceName.trim().length > 0 &&
    isSafeSourceUrl(article.sourceUrl) &&
    isValidDate(article.sourcePublishedAt) &&
    isValidDate(article.appPublishedAt) &&
    article.category.length > 0 &&
    Number.isFinite(article.readingMinutes) &&
    article.readingMinutes >= 1
  );
}

export function isAssessmentApproved(assessment: EditorialAssessment) {
  const t = BRIGHT_NEWS_THRESHOLDS;

  return (
    assessment.policyVersion === BRIGHT_NEWS_POLICY_VERSION &&
    assessment.decision === 'APPROVE' &&
    assessment.brightnessScore >= t.brightnessScore &&
    assessment.emotionalSafetyScore >= t.emotionalSafetyScore &&
    assessment.hopeScore >= t.hopeScore &&
    assessment.positiveChangeScore >= t.positiveChangeScore &&
    assessment.darkContextRatio <= t.darkContextRatio &&
    assessment.reliabilityScore >= t.reliabilityScore &&
    assessment.rightsStatus !== 'REVIEW_REQUIRED' &&
    isValidDate(assessment.assessedAt)
  );
}

export function isProvenanceComplete(provenance: ArticleProvenance) {
  return (
    Number.isInteger(provenance.version) &&
    provenance.version >= 1 &&
    Number.isInteger(provenance.sourceCount) &&
    provenance.sourceCount >= 1 &&
    provenance.correctionStatus !== 'RETRACTED' &&
    isValidDate(provenance.factCheckedAt) &&
    isValidDate(provenance.editorialReviewedAt) &&
    isValidDate(provenance.lastVerifiedAt)
  );
}

function isLegacyMockEligible(article: Article) {
  const searchable = `${article.title}\n${article.summary}\n${article.body}`;
  const hasDarkContext = LEGACY_DARK_CONTEXT_TERMS.some((term) => searchable.includes(term));

  return article.comfortScore >= 75 && !hasDarkContext;
}

/**
 * Single publication gate used by every reader-facing selector.
 *
 * - Every article must have a safe HTTPS source and valid reader-facing shape.
 * - Real articles require an approved structured assessment and provenance.
 * - Existing example.com mock articles use a conservative temporary fallback.
 * - A warm ending never overrides a dark or distressing premise.
 */
export function isArticleEligibleForPublication(article: Article) {
  if (!isPublishedStatus(article) || !isArticleShapeSafe(article)) return false;

  if (article.editorialAssessment) {
    return Boolean(
      article.provenance &&
      isAssessmentApproved(article.editorialAssessment) &&
      isProvenanceComplete(article.provenance),
    );
  }

  return isMockArticle(article) && isLegacyMockEligible(article);
}

export function getBrightnessRank(article: Article) {
  return article.editorialAssessment?.brightnessScore ?? article.comfortScore;
}
