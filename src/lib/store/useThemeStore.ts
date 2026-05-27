'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FontScale, ThemePref, TimeOfDay } from '@/lib/theme/types';

interface ThemeState {
  /** auto = follow clock + OS; otherwise force light/dark. */
  pref: ThemePref;
  /** QA override for time-of-day; null = follow the clock. */
  timeOverride: TimeOfDay | null;
  /** User-facing text size; scales the whole app via root rem. */
  fontScale: FontScale;
  setPref: (pref: ThemePref) => void;
  setTimeOverride: (time: TimeOfDay | null) => void;
  setFontScale: (scale: FontScale) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      pref: 'auto',
      timeOverride: null,
      fontScale: 'standard',
      setPref: (pref) => set({ pref }),
      setTimeOverride: (timeOverride) => set({ timeOverride }),
      setFontScale: (fontScale) => set({ fontScale }),
    }),
    { name: 'hotnews-theme' },
  ),
);
