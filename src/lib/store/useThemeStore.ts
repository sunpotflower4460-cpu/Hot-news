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

const PREFS = new Set<ThemePref>(['auto', 'light', 'dark']);
const TIMES = new Set<TimeOfDay>(['morning', 'day', 'evening', 'night']);

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      pref: 'auto',
      timeOverride: null,
      setPref: (pref) => set({ pref }),
      setTimeOverride: (timeOverride) => set({ timeOverride }),
    }),
    {
      name: 'hotnews-theme',
      version: 1,
      partialize: (state) => ({ pref: state.pref, timeOverride: state.timeOverride }),
      migrate: (persistedState) => {
        const stored = persistedState as Partial<ThemeState>;
        const pref = PREFS.has(stored.pref as ThemePref) ? (stored.pref as ThemePref) : 'auto';
        const timeOverride = TIMES.has(stored.timeOverride as TimeOfDay)
          ? (stored.timeOverride as TimeOfDay)
          : null;
        return { pref, timeOverride };
      },
    },
  ),
);
