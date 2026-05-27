import type { TimeOfDay } from './types';

/** Phase cutoffs (local hours): morning 5–10, day 10–16, evening 16–19, night 19–5. */
export function resolveTimeOfDay(date: Date = new Date()): TimeOfDay {
  const h = date.getHours();
  if (h >= 5 && h < 10) return 'morning';
  if (h >= 10 && h < 16) return 'day';
  if (h >= 16 && h < 19) return 'evening';
  return 'night';
}

export const TIME_LABELS_JA: Record<TimeOfDay, string> = {
  morning: '朝',
  day: '昼',
  evening: '夕',
  night: '夜',
};

/** A soft greeting that matches the heart-weather metaphor. */
export const TIME_GREETINGS_JA: Record<TimeOfDay, string> = {
  morning: 'おはようございます',
  day: 'こんにちは',
  evening: 'おつかれさまです',
  night: 'こんばんは',
};

export const TIME_SUBTITLES_JA: Record<TimeOfDay, string> = {
  morning: '今日も小さな灯りからはじめましょう',
  day: 'ひと息ついて、やさしいニュースを',
  evening: '一日のおわりに、ほっとする話を',
  night: 'おやすみ前に、静かな知らせを',
};
