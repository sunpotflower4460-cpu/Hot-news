import type { Locale } from '@/lib/i18n/messages';

const MS_PER_MINUTE = 60 * 1000;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;

export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: locale === 'ja' ? 'long' : 'short',
    day: 'numeric',
  }).format(new Date(iso));
}

/** "2026年5月27日" style date retained for Japanese-only operational copy. */
export function formatJaDate(iso: string): string {
  return formatDate(iso, 'ja');
}

export function relativeTime(iso: string, locale: Locale, now: Date = new Date()): string {
  const diff = now.getTime() - new Date(iso).getTime();
  if (diff < MS_PER_HOUR) {
    const mins = Math.max(1, Math.floor(diff / MS_PER_MINUTE));
    if (diff < 5 * MS_PER_MINUTE) return locale === 'ja' ? 'たった今' : 'Just now';
    return locale === 'ja' ? `${mins}分前` : `${mins}m ago`;
  }
  if (diff < MS_PER_DAY) {
    const hours = Math.floor(diff / MS_PER_HOUR);
    return locale === 'ja' ? `${hours}時間前` : `${hours}h ago`;
  }
  const days = Math.floor(diff / MS_PER_DAY);
  if (days === 1) return locale === 'ja' ? '昨日' : 'Yesterday';
  if (days < 7) return locale === 'ja' ? `${days}日前` : `${days}d ago`;
  return formatDate(iso, locale);
}

/** Japanese compatibility wrapper. */
export function relativeJa(iso: string, now: Date = new Date()): string {
  return relativeTime(iso, 'ja', now);
}
