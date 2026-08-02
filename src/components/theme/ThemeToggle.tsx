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
  const pref = useThemeStore((state) => state.pref);
  const setPref = useThemeStore((state) => state.setPref);
  const current = hydrated ? pref : 'auto';

  return (
    <div className="flex gap-1 rounded-[1.35rem] border border-line/45 bg-surface-2/70 p-1 shadow-inner-light">
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = current === value;
        return (
          <button
            type="button"
            key={value}
            onClick={() => setPref(value)}
            aria-pressed={active}
            className={cn(
              'flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-[1.05rem] px-2 text-caption font-semibold transition-all duration-300 ease-gentle active:scale-95',
              active
                ? 'bg-surface text-accent shadow-soft'
                : 'text-muted hover:bg-surface/45 hover:text-text',
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
