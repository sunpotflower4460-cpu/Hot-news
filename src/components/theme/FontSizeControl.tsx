'use client';

import { useThemeStore } from '@/lib/store/useThemeStore';
import { useHydrated } from '@/lib/utils/useHydrated';
import type { FontScale } from '@/lib/theme/types';
import { cn } from '@/lib/utils/cn';

const OPTIONS: { value: FontScale; label: string; size: string }[] = [
  { value: 'standard', label: '標準', size: 'text-[0.9rem]' },
  { value: 'large', label: '大きめ', size: 'text-[1.05rem]' },
  { value: 'xl', label: '特大', size: 'text-[1.2rem]' },
];

export function FontSizeControl() {
  const hydrated = useHydrated();
  const fontScale = useThemeStore((s) => s.fontScale);
  const setFontScale = useThemeStore((s) => s.setFontScale);
  const current = hydrated ? fontScale : 'standard';

  return (
    <div className="flex gap-1 rounded-pill bg-surface-2 p-1">
      {OPTIONS.map(({ value, label, size }) => {
        const active = current === value;
        return (
          <button
            key={value}
            onClick={() => setFontScale(value)}
            aria-pressed={active}
            className={cn(
              'flex flex-1 items-center justify-center rounded-pill py-2.5 font-medium transition-colors',
              size,
              active ? 'bg-surface text-accent shadow-soft' : 'text-muted',
            )}
          >
            あ<span className="ml-0.5 text-caption">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
