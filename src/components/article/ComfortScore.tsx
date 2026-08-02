'use client';

import { Sun } from 'lucide-react';
import { useI18n } from '@/lib/i18n/useI18n';
import { cn } from '@/lib/utils/cn';

interface BrightnessScoreProps {
  /** 0–100. Shown as a gentle five-level brightness indicator. */
  score: number;
  showLabel?: boolean;
  className?: string;
}

export function BrightnessScore({ score, showLabel = true, className }: BrightnessScoreProps) {
  const { locale, t } = useI18n();
  const level = Math.max(1, Math.min(5, Math.round(score / 20)));

  return (
    <div
      className={cn('inline-flex items-center gap-1.5', className)}
      role="img"
      aria-label={
        locale === 'ja'
          ? `${t('article.brightness')} 5段階中 ${level}`
          : `${t('article.brightness')}: ${level} out of 5`
      }
    >
      {showLabel && (
        <span className="text-[0.7rem] font-semibold text-muted">{t('article.brightness')}</span>
      )}
      <span aria-hidden className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Sun
            key={index}
            size={12}
            strokeWidth={2}
            className={cn(index < level ? 'fill-accent text-accent' : 'text-line')}
          />
        ))}
      </span>
    </div>
  );
}

/** @deprecated Use BrightnessScore. Kept temporarily for existing imports. */
export const ComfortScore = BrightnessScore;
