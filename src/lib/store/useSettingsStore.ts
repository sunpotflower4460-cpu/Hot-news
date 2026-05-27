'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CategoryId } from '@/types/article';

interface SettingsState {
  onboarded: boolean;
  morningNotify: boolean;
  nightNotify: boolean;
  weeklyDigest: boolean;
  topicNotify: CategoryId[];
  isPremium: boolean;
  homeHintDismissed: boolean;
  setOnboarded: (v: boolean) => void;
  setMorningNotify: (v: boolean) => void;
  setNightNotify: (v: boolean) => void;
  setWeeklyDigest: (v: boolean) => void;
  toggleTopic: (id: CategoryId) => void;
  setPremium: (v: boolean) => void;
  dismissHomeHint: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      onboarded: false,
      morningNotify: true,
      nightNotify: true,
      weeklyDigest: true,
      topicNotify: [],
      isPremium: false,
      homeHintDismissed: false,
      setOnboarded: (onboarded) => set({ onboarded }),
      setMorningNotify: (morningNotify) => set({ morningNotify }),
      setNightNotify: (nightNotify) => set({ nightNotify }),
      setWeeklyDigest: (weeklyDigest) => set({ weeklyDigest }),
      toggleTopic: (id) =>
        set((state) => ({
          topicNotify: state.topicNotify.includes(id)
            ? state.topicNotify.filter((x) => x !== id)
            : [...state.topicNotify, id],
        })),
      setPremium: (isPremium) => set({ isPremium }),
      dismissHomeHint: () => set({ homeHintDismissed: true }),
    }),
    { name: 'hotnews-settings' },
  ),
);
