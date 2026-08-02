'use client';

import { useLocaleStore } from '@/lib/store/useLocaleStore';
import { translate, type TranslationKey } from './messages';

export function useI18n() {
  const locale = useLocaleStore((state) => state.locale);

  return {
    locale,
    t: (key: TranslationKey) => translate(locale, key),
    formatDate: (value: string | Date, options?: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'en-US', options).format(
        typeof value === 'string' ? new Date(value) : value,
      ),
    formatNumber: (value: number) =>
      new Intl.NumberFormat(locale === 'ja' ? 'ja-JP' : 'en-US').format(value),
  };
}
