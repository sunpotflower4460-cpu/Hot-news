'use client';

import { Moon, Sun, SunMoon } from 'lucide-react';
import { useThemeStore } from '@/lib/store/useThemeStore';
import { useHydrated } from '@/lib/utils/useHydrated';
import type { ThemePref } from '@/lib/theme/types';
import { cn } from '@/lib/utils/cn';

const OPTIONS: { value: ThemePref; label: string; shortLabel: string; Icon: typeof Sun }[] = [
  { value: 'auto', label: '端末の設定に合わせる', shortLabel: '端末に合わせる', Icon: SunMoon },
  { value: 'light', label: '明るい画面にする', shortLabel: '明るい', Icon: Sun },
  { value: 'dark', label: '暗い画面にする', shortLabel: '暗い', Icon: Moon },
];

export function ThemeToggle() {
  const hydrated = useHydrated();
  const pref = useThemeStore((state) => state.pref);
  const setPref = useThemeStore((state) => state.setPref);
  const current = hydrated ? pref : 'auto';

  return (
    <div
      role="group"
      aria-label="画面の明るさ"
      className="flex gap-1 rounded-[1.35rem] border border-line/45 bg-surface-2/70 p-1 shadow-inner-light"
    >
      {OPTIONS.map(({ value, label, shortLabel, Icon }) => {
        const active = current === value;
        return (
          <button
            type="button"
            key={value}
            onClick={() => setPref(value)}
            aria-label={label}
            aria-pressed={active}
            className={cn(
              'flex min-h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-[1.05rem] px-1.5 text-[0.72rem] font-semibold transition-all duration-300 ease-gentle active:scale-95',
              active
                ? 'bg-surface text-accent shadow-soft'
                : 'text-muted hover:bg-surface/45 hover:text-text',
            )}
          >
            <Icon aria-hidden size={15} className="shrink-0" />
            <span className="truncate">{shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
