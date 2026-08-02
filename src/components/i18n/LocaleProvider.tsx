'use client';

import { useEffect, type ReactNode } from 'react';
import { useLocaleStore } from '@/lib/store/useLocaleStore';

const META = {
  ja: {
    title: '明るいニュース｜Hot News',
    description:
      '世界の中から、出来事そのものが明るく、希望や喜びを感じられるニュースだけを届けるアプリ。',
  },
  en: {
    title: 'Bright News | Hot News',
    description:
      'A calm news app that selects only events whose core is genuinely bright, hopeful, or joyful.',
  },
} as const;

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useLocaleStore((state) => state.locale);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = 'ltr';
    root.dataset.locale = locale;
    document.title = META[locale].title;

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = META[locale].description;
  }, [locale]);

  return children;
}
