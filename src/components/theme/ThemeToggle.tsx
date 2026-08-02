'use client';

import { Moon, Sun, SunMoon } from 'lucide-react';
import type { TranslationKey } from '@/lib/i18n/messages';
import { useI18n } from '@/lib/i18n/useI18n';
import { useThemeStore } from '@/lib/store/useThemeStore';
import { useHydrated } from '@/lib/utils/useHydrated';
import type { ThemePref } from '@/lib/theme/types';
import { cn } from '@/lib/utils/cn';

const OPTIONS: { value: ThemePref; labelKey: TranslationKey; Icon: typeof Sun }[] = [
  { value: 'auto', labelKey: 'theme.system', Icon: SunMoon },
  { value: 'light', labelKey: 'theme.light', Icon: Sun },
  { value: 'dark', labelKey: 'theme.dark', Icon: Moon },
];

export function ThemeToggle() {
  const hydrated = useHydrated();
  const { t } = useI18n();
  const pref = useThemeStore((state) => state.pref);
  const setPref = useThemeStore((state) => state.setPref);
  const current = hydrated ? pref : 'auto';

  return (
    <div
      role="group"
      aria-label={t('settings.appearance')}
      className="flex gap-1 rounded-[1.35rem] border border-line/45 bg-surface-2/70 p-1 shadow-inner-light"
    >
      {OPTIONS.map(({ value, labelKey, Icon }) => {
        const active = current === value;
        const label = t(labelKey);
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
            <span className="truncate">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
