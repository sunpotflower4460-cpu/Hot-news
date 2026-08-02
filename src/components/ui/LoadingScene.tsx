'use client';

import { Sparkles, Sun } from 'lucide-react';
import { useI18n } from '@/lib/i18n/useI18n';

export function LoadingScene({ label, compact = false }: { label?: string; compact?: boolean }) {
  const { locale } = useI18n();
  const resolvedLabel =
    label ??
    (locale === 'ja' ? '明るいニュースを集めています…' : 'Gathering bright stories…');

  return (
    <div
      role="status"
      aria-live="polite"
      className={
        compact
          ? 'flex flex-col items-center justify-center px-6 py-14 text-center'
          : 'flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-bg px-6 text-center'
      }
    >
      <div className="relative flex h-36 w-36 items-center justify-center">
        <div className="absolute inset-0 animate-breathe rounded-full bg-accent-soft/80 blur-2xl" />
        <div className="ambient-ring relative flex h-24 w-24 animate-float items-center justify-center rounded-full bg-white/35 text-accent shadow-glow backdrop-blur-sm">
          <Sun aria-hidden size={40} strokeWidth={1.6} className="fill-accent/15" />
        </div>
        <Sparkles aria-hidden className="absolute right-1 top-5 animate-twinkle text-accent" size={18} />
        <span className="absolute bottom-5 left-2 h-3 w-3 animate-float rounded-full bg-white/55 shadow-glow [animation-delay:-1.5s]" />
      </div>
      <p className="mt-2 font-rounded text-body font-medium text-text">{resolvedLabel}</p>
      <p className="mt-1 text-caption text-muted">
        {locale === 'ja' ? 'ほんの少しだけ、お待ちください。' : 'This should only take a moment.'}
      </p>
    </div>
  );
}
