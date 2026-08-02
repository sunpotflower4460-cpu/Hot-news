'use client';

import { Languages } from 'lucide-react';
import { useI18n } from '@/lib/i18n/useI18n';
import { useLocaleStore } from '@/lib/store/useLocaleStore';
import type { Locale } from '@/lib/i18n/messages';
import { cn } from '@/lib/utils/cn';

interface LanguageSwitcherProps {
  compact?: boolean;
  className?: string;
}

const OPTIONS: Locale[] = ['ja', 'en'];

export function LanguageSwitcher({ compact = false, className }: LanguageSwitcherProps) {
  const { locale, t } = useI18n();
  const setLocale = useLocaleStore((state) => state.setLocale);

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className={cn(
        'glass inline-flex items-center gap-1 rounded-pill border p-1 shadow-soft',
        className,
      )}
    >
      {!compact && (
        <span className="flex h-9 w-9 items-center justify-center rounded-full text-accent">
          <Languages aria-hidden size={17} />
        </span>
      )}
      {OPTIONS.map((option) => {
        const active = locale === option;
        return (
          <button
            type="button"
            key={option}
            aria-pressed={active}
            aria-label={option === 'ja' ? t('language.japanese') : t('language.english')}
            onClick={() => setLocale(option)}
            className={cn(
              'min-h-9 rounded-pill px-3 text-[0.72rem] font-bold transition-all duration-200 active:scale-95',
              active
                ? 'bg-accent-strong text-white shadow-glow'
                : 'text-muted hover:bg-surface/70 hover:text-text',
            )}
          >
            {option === 'ja' ? '日本語' : 'EN'}
          </button>
        );
      })}
    </div>
  );
}
