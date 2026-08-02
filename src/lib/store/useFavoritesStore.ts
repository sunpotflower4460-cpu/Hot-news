'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  ids: string[];
  toggle: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((savedId) => savedId !== id)
            : [id, ...state.ids],
        })),
      isFavorite: (id) => get().ids.includes(id),
    }),
    {
      name: 'hotnews-favorites',
      version: 1,
      partialize: (state) => ({ ids: state.ids }),
      migrate: (persistedState) => {
        const stored = persistedState as { ids?: unknown };
        const ids = Array.isArray(stored.ids)
          ? [...new Set(stored.ids.filter((id): id is string => typeof id === 'string'))]
          : [];
        return { ids };
      },
    },
  ),
);
