'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CategoryId } from '@/types/article';

interface SettingsState {
  onboarded: boolean;
  homeHintDismissed: boolean;
  morningNotify: boolean;
  nightNotify: boolean;
  weeklyDigest: boolean;
  topicNotify: CategoryId[];
  isPremium: boolean;
  setOnboarded: (value: boolean) => void;
  dismissHomeHint: () => void;
  setMorningNotify: (value: boolean) => void;
  setNightNotify: (value: boolean) => void;
  setWeeklyDigest: (value: boolean) => void;
  toggleTopic: (id: CategoryId) => void;
  setPremium: (value: boolean) => void;
}

const CATEGORY_IDS = new Set<CategoryId>([
  'animals-nature',
  'kindness',
  'bright-tech',
  'arts-culture',
  'night-reads',
]);

const bool = (value: unknown, fallback: boolean) => (typeof value === 'boolean' ? value : fallback);

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      onboarded: false,
      homeHintDismissed: false,
      morningNotify: false,
      nightNotify: false,
      weeklyDigest: false,
      topicNotify: [],
      isPremium: false,
      setOnboarded: (onboarded) => set({ onboarded }),
      dismissHomeHint: () => set({ homeHintDismissed: true }),
      setMorningNotify: (morningNotify) => set({ morningNotify }),
      setNightNotify: (nightNotify) => set({ nightNotify }),
      setWeeklyDigest: (weeklyDigest) => set({ weeklyDigest }),
      toggleTopic: (id) =>
        set((state) => ({
          topicNotify: state.topicNotify.includes(id)
            ? state.topicNotify.filter((topicId) => topicId !== id)
            : [...state.topicNotify, id],
        })),
      setPremium: (isPremium) => set({ isPremium }),
    }),
    {
      name: 'hotnews-settings',
      version: 2,
      partialize: (state) => ({
        onboarded: state.onboarded,
        homeHintDismissed: state.homeHintDismissed,
        morningNotify: state.morningNotify,
        nightNotify: state.nightNotify,
        weeklyDigest: state.weeklyDigest,
        topicNotify: state.topicNotify,
        isPremium: state.isPremium,
      }),
      migrate: (persistedState, version) => {
        const stored = persistedState as Partial<SettingsState>;
        const topicNotify = Array.isArray(stored.topicNotify)
          ? [
              ...new Set(
                stored.topicNotify.filter((id): id is CategoryId =>
                  CATEGORY_IDS.has(id as CategoryId),
                ),
              ),
            ]
          : [];
        const legacyNotificationDefaults = version < 2;

        return {
          onboarded: bool(stored.onboarded, false),
          homeHintDismissed: bool(stored.homeHintDismissed, false),
          morningNotify: legacyNotificationDefaults ? false : bool(stored.morningNotify, false),
          nightNotify: legacyNotificationDefaults ? false : bool(stored.nightNotify, false),
          weeklyDigest: legacyNotificationDefaults ? false : bool(stored.weeklyDigest, false),
          topicNotify: legacyNotificationDefaults ? [] : topicNotify,
          isPremium: bool(stored.isPremium, false),
        };
      },
    },
  ),
);
