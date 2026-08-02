'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ReadingEntry {
  id: string;
  readAt: string;
}

interface ReadingState {
  entries: ReadingEntry[];
  markRead: (id: string) => void;
  clearHistory: () => void;
}

const MAX_ENTRIES = 50;
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

function sanitizeEntries(value: unknown): ReadingEntry[] {
  if (!Array.isArray(value)) return [];

  const now = Date.now();
  const seen = new Set<string>();

  return value
    .filter((entry): entry is ReadingEntry => {
      if (!entry || typeof entry !== 'object') return false;
      const candidate = entry as Partial<ReadingEntry>;
      if (typeof candidate.id !== 'string' || typeof candidate.readAt !== 'string') return false;
      const timestamp = Date.parse(candidate.readAt);
      return Number.isFinite(timestamp) && now - timestamp <= MAX_AGE_MS;
    })
    .sort((a, b) => Date.parse(b.readAt) - Date.parse(a.readAt))
    .filter((entry) => {
      if (seen.has(entry.id)) return false;
      seen.add(entry.id);
      return true;
    })
    .slice(0, MAX_ENTRIES);
}

export const useReadingStore = create<ReadingState>()(
  persist(
    (set) => ({
      entries: [],
      markRead: (id) =>
        set((state) => ({
          entries: sanitizeEntries([
            { id, readAt: new Date().toISOString() },
            ...state.entries.filter((entry) => entry.id !== id),
          ]),
        })),
      clearHistory: () => set({ entries: [] }),
    }),
    {
      name: 'hotnews-reading',
      version: 1,
      partialize: (state) => ({ entries: state.entries }),
      migrate: (persistedState) => {
        const stored = persistedState as Partial<ReadingState>;
        return { entries: sanitizeEntries(stored.entries) };
      },
    },
  ),
);
