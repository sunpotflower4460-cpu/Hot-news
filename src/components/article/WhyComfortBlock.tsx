'use client';

import { Sparkles } from 'lucide-react';
import { useI18n } from '@/lib/i18n/useI18n';

export function WhyComfortBlock({ text }: { text: string }) {
  const { locale } = useI18n();

  return (
    <aside className="relative overflow-hidden rounded-panel border border-accent/10 bg-accent-soft/60 p-5 shadow-inner-light">
      <div className="absolute -right-8 -top-9 h-28 w-28 animate-breathe rounded-full bg-white/40 blur-2xl" />
      <div className="relative flex items-center gap-2 text-accent">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/40 shadow-inner-light backdrop-blur-sm">
          <Sparkles aria-hidden size={15} className="fill-accent/15" />
        </span>
        <h2 className="text-caption font-bold tracking-wide">
          {locale === 'ja' ? 'このニュースの明るいところ' : 'What makes this story bright'}
        </h2>
      </div>
      <p className="relative mt-3 text-body leading-[1.9] text-text/90">{text}</p>
    </aside>
  );
}
