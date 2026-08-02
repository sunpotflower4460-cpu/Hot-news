'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ConsentChoice = 'unset' | 'allowed' | 'denied';

interface PrivacyState {
  analytics: ConsentChoice;
  diagnostics: ConsentChoice;
  personalization: ConsentChoice;
  consentVersion: string;
  updatedAt: string | null;
  setAnalytics: (choice: ConsentChoice) => void;
  setDiagnostics: (choice: ConsentChoice) => void;
  setPersonalization: (choice: ConsentChoice) => void;
  resetConsent: () => void;
}

const CONSENT_VERSION = 'privacy-v1';
const CHOICES = new Set<ConsentChoice>(['unset', 'allowed', 'denied']);

const safeChoice = (value: unknown): ConsentChoice =>
  typeof value === 'string' && CHOICES.has(value as ConsentChoice)
    ? (value as ConsentChoice)
    : 'unset';

const updated = () => new Date().toISOString();

export const usePrivacyStore = create<PrivacyState>()(
  persist(
    (set) => ({
      analytics: 'denied',
      diagnostics: 'denied',
      personalization: 'allowed',
      consentVersion: CONSENT_VERSION,
      updatedAt: null,
      setAnalytics: (analytics) => set({ analytics, updatedAt: updated() }),
      setDiagnostics: (diagnostics) => set({ diagnostics, updatedAt: updated() }),
      setPersonalization: (personalization) => set({ personalization, updatedAt: updated() }),
      resetConsent: () =>
        set({
          analytics: 'denied',
          diagnostics: 'denied',
          personalization: 'allowed',
          consentVersion: CONSENT_VERSION,
          updatedAt: updated(),
        }),
    }),
    {
      name: 'hotnews-privacy',
      version: 1,
      migrate: (persisted) => {
        const previous = (persisted ?? {}) as Partial<PrivacyState>;
        return {
          ...previous,
          analytics: safeChoice(previous.analytics),
          diagnostics: safeChoice(previous.diagnostics),
          personalization: safeChoice(previous.personalization),
          consentVersion: CONSENT_VERSION,
          updatedAt: typeof previous.updatedAt === 'string' ? previous.updatedAt : null,
        } as PrivacyState;
      },
      partialize: (state) => ({
        analytics: state.analytics,
        diagnostics: state.diagnostics,
        personalization: state.personalization,
        consentVersion: state.consentVersion,
        updatedAt: state.updatedAt,
      }),
    },
  ),
);
