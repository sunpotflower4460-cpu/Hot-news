'use client';

import { Moon, Sun, SunMoon } from 'lucide-react';
import { useThemeStore } from '@/lib/store/useThemeStore';
import { useHydrated } from '@/lib/utils/useHydrated';
import type { ThemePref } from '@/lib/theme/types';
import { cn } from '@/lib/utils/cn';

const OPTIONS: { value: ThemePref; label: string; Icon: typeof Sun }[] = [
  { value: 'auto', label: 'おまかせ', Icon: SunMoon },
  { value: 'light', label: 'あかるい', Icon: Sun },
  { value: 'dark', label: 'くらい', Icon: Moon },
];

export function ThemeToggle() {
  const hydrated = useHydrated();
  const pref = useThemeStore((s) => s.pref);
  const setPref = useThemeStore((s) => s.setPref);
  const current = hydrated ? pref : 'auto';

  return (
    <div className="flex gap-1 rounded-pill bg-surface-2 p-1">
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = current === value;
        return (
          <button
            key={value}
            onClick={() => setPref(value)}
            aria-pressed={active}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 rounded-pill py-2 text-caption font-medium transition-colors',
              active ? 'bg-surface text-accent shadow-soft' : 'text-muted',
            )}
          >
            <Icon size={15} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
