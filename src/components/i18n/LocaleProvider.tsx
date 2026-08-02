'use client';

import { useEffect, type ReactNode } from 'react';
import { useLocaleStore } from '@/lib/store/useLocaleStore';

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useLocaleStore((state) => state.locale);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = 'ltr';
    root.dataset.locale = locale;
  }, [locale]);

  return children;
}
