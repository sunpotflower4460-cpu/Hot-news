'use client';

import { commercialConfig } from '@/config/commercial';
import { usePrivacyStore } from '@/lib/store/usePrivacyStore';

type Primitive = string | number | boolean | null;
export type TelemetryProperties = Record<string, Primitive>;

const cleanProperties = (properties: TelemetryProperties): TelemetryProperties =>
  Object.fromEntries(
    Object.entries(properties).filter(
      ([key, value]) =>
        !/(email|name|address|phone|token|password|url|query|message|body)/i.test(key) &&
        (value === null || ['string', 'number', 'boolean'].includes(typeof value)),
    ),
  );

export function trackEvent(name: string, properties: TelemetryProperties = {}) {
  if (!commercialConfig.features.analytics) return;
  if (usePrivacyStore.getState().analytics !== 'allowed') return;

  const payload = cleanProperties(properties);

  if (process.env.NODE_ENV !== 'production') {
    console.debug('[telemetry preview]', name, payload);
  }

  // Intentionally no provider implementation here. A commercial analytics
  // adapter must be added only after privacy disclosures and consent UX match.
}

export function captureException(error: unknown, context: TelemetryProperties = {}) {
  if (!commercialConfig.features.diagnostics) return;
  if (usePrivacyStore.getState().diagnostics !== 'allowed') return;

  const safeContext = cleanProperties(context);
  const summary = error instanceof Error ? error.name : 'UnknownError';

  if (process.env.NODE_ENV !== 'production') {
    console.debug('[diagnostics preview]', summary, safeContext);
  }

  // Do not send stack traces, article text, URLs, or user-entered content until
  // a reviewed diagnostics provider and retention policy are configured.
}
