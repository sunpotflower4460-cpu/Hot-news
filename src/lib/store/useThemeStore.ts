'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemePref, TimeOfDay } from '@/lib/theme/types';

interface ThemeState {
  /** auto = follow clock + OS; otherwise force light/dark. */
  pref: ThemePref;
  /** QA override for time-of-day; null = follow the clock. */
  timeOverride: TimeOfDay | null;
  setPref: (pref: ThemePref) => void;
  setTimeOverride: (time: TimeOfDay | null) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      pref: 'auto',
      timeOverride: null,
      setPref: (pref) => set({ pref }),
      setTimeOverride: (timeOverride) => set({ timeOverride }),
    }),
    { name: 'hotnews-theme' },
  ),
);
