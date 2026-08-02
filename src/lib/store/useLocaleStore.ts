'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Locale } from '@/lib/i18n/messages';

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const isLocale = (value: unknown): value is Locale => value === 'ja' || value === 'en';

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: 'ja',
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: 'hotnews-locale',
      version: 1,
      partialize: (state) => ({ locale: state.locale }),
      migrate: (persistedState) => {
        const stored = persistedState as Partial<LocaleState>;
        return { locale: isLocale(stored.locale) ? stored.locale : 'ja' };
      },
    },
  ),
);
