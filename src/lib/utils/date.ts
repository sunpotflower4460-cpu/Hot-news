const MS_PER_MINUTE = 60 * 1000;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;

/** "2026年5月27日" style date for the app. */
export function formatJaDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

/** Gentle relative time: "たった今" / "3時間前" / "昨日" / date. */
export function relativeJa(iso: string, now: Date = new Date()): string {
  const diff = now.getTime() - new Date(iso).getTime();
  if (diff < MS_PER_HOUR) {
    const mins = Math.max(1, Math.floor(diff / MS_PER_MINUTE));
    return diff < 5 * MS_PER_MINUTE ? 'たった今' : `${mins}分前`;
  }
  if (diff < MS_PER_DAY) {
    return `${Math.floor(diff / MS_PER_HOUR)}時間前`;
  }
  const days = Math.floor(diff / MS_PER_DAY);
  if (days === 1) return '昨日';
  if (days < 7) return `${days}日前`;
  return formatJaDate(iso);
}
