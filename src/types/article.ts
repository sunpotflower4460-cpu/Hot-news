export type CategoryId =
  | 'animals-nature'
  | 'kindness'
  | 'bright-tech'
  | 'arts-culture'
  | 'night-reads';

export type ArticleStatus = 'PUBLISHED' | 'SAFE_SHORT_VERSION' | 'READY_TO_PUBLISH';

export type PublishMode = 'normal' | 'safe_short' | 'no_image' | 'source_link_only';

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
  /** 0–100; surfaced as a gentle "ほっと度" visual, never a raw number. */
  comfortScore: number;
  imageUrl?: string;
  /** "なぜほっとするか" — the signature editorial note. */
  whyComfort: string;
  region: string;
  readingMinutes: number;
  status: ArticleStatus;
  publishMode: PublishMode;
  /** Hand-picked highlights for the home hero. */
  isTodayHot?: boolean;
  /** Short, calming pieces for 夜に読む / 寝る前モード. */
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
