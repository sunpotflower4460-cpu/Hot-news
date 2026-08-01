export type CategoryId =
  | 'animals-nature'
  | 'kindness'
  | 'bright-tech'
  | 'arts-culture'
  | 'night-reads';

export type ArticleStatus =
  | 'INGESTED'
  | 'SOURCE_VALIDATING'
  | 'EDITORIAL_REVIEW'
  | 'RIGHTS_REVIEW'
  | 'READY_TO_PUBLISH'
  | 'PUBLISHED'
  | 'SAFE_SHORT_VERSION'
  | 'QUARANTINED'
  | 'REJECTED'
  | 'RETRACTED';

export type PublishMode = 'normal' | 'safe_short' | 'no_image' | 'source_link_only';

export type EditorialDecision = 'APPROVE' | 'REVIEW' | 'REJECT';
export type RightsStatus = 'CLEARED' | 'SOURCE_LINK_ONLY' | 'REVIEW_REQUIRED';

/**
 * Editorial evidence used to enforce the product promise: the event itself must
 * be bright. A warm ending does not make a dark or distressing story eligible.
 */
export interface EditorialAssessment {
  policyVersion: 'bright-news-v1';
  decision: EditorialDecision;
  /** 0–100: how bright and positive the event itself is. */
  brightnessScore: number;
  /** 0–100: how safely the story can be read without emotional burden. */
  emotionalSafetyScore: number;
  /** 0–100: how much hope or positive possibility remains after reading. */
  hopeScore: number;
  /** 0–100: whether a concrete improvement, creation, recovery, or progress occurred. */
  positiveChangeScore: number;
  /** 0–100: proportion of the story that depends on tragedy, fear, illness, or loss. */
  darkContextRatio: number;
  /** 0–100: confidence in the source and factual support. */
  reliabilityScore: number;
  rightsStatus: RightsStatus;
  reasons: string[];
  assessedAt: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  body: string;
  sourceUrl: string;
  sourceName: string;
  sourcePublishedAt: string;
  appPublishedAt: string;
  category: CategoryId[];
  /**
   * Legacy UI score retained while the mock corpus is migrated. New content
   * must use editorialAssessment for publication eligibility.
   */
  comfortScore: number;
  editorialAssessment?: EditorialAssessment;
  imageUrl?: string;
  /** Editorial note explaining the positive value of the event. */
  whyComfort: string;
  region: string;
  readingMinutes: number;
  status: ArticleStatus;
  publishMode: PublishMode;
  /** Hand-picked highlights for the home hero. */
  isTodayHot?: boolean;
  /** Short, emotionally safe pieces for the bedtime experience. */
  isNightRead?: boolean;
}

export interface CategoryMeta {
  id: CategoryId;
  labelJa: string;
  /** HSL channel string, e.g. "18 90% 70%" — composes with theme tokens. */
  accent: string;
  glyph: string;
  blurb: string;
}

export interface DigestWeek {
  weekLabel: string;
  intro: string;
  articleIds: string[];
}
