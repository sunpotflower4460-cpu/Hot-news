'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bookmark, BookOpenText, Compass, Home, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import type { TranslationKey } from '@/lib/i18n/messages';
import { useI18n } from '@/lib/i18n/useI18n';
import { cn } from '@/lib/utils/cn';

const TABS: {
  href: string;
  labelKey: TranslationKey;
  Icon: typeof Home;
}[] = [
  { href: '/home', labelKey: 'nav.home', Icon: Home },
  { href: '/browse', labelKey: 'nav.browse', Icon: Compass },
  { href: '/favorites', labelKey: 'nav.saved', Icon: Bookmark },
  { href: '/digest', labelKey: 'nav.digest', Icon: BookOpenText },
  { href: '/settings', labelKey: 'nav.settings', Icon: Settings },
];

export function BottomTabBar() {
  const pathname = usePathname();
  const { locale, t } = useI18n();

  return (
    <nav
      aria-label={locale === 'ja' ? 'メインナビゲーション' : 'Main navigation'}
      className="safe-bottom relative z-30 shrink-0 px-3 pt-1"
    >
      <div className="glass rounded-[1.65rem] border shadow-float">
        <ul className="flex items-stretch justify-around px-1.5 py-1.5">
          {TABS.map(({ href, labelKey, Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            const label = t(labelKey);
            return (
              <li key={href} className="min-w-0 flex-1">
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  aria-label={
                    active
                      ? locale === 'ja'
                        ? `${label}、現在のページ`
                        : `${label}, current page`
                      : label
                  }
                  className="relative flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 rounded-[1.25rem] px-0.5 py-1.5 active:scale-95"
                >
                  {active && (
                    <motion.span
                      layoutId="tab-pill"
                      aria-hidden
                      className="absolute inset-x-1 inset-y-0 rounded-[1.2rem] border border-white/35 bg-accent-soft/85 shadow-inner-light"
                      transition={{ type: 'spring', stiffness: 360, damping: 31, mass: 0.8 }}
                    />
                  )}
                  <Icon
                    aria-hidden
                    size={20}
                    strokeWidth={active ? 2.45 : 1.85}
                    className={cn(
                      'relative z-10 transition-all duration-300',
                      active ? '-translate-y-0.5 text-accent' : 'text-muted',
                    )}
                  />
                  <span
                    className={cn(
                      'relative z-10 max-w-full truncate text-[0.69rem] font-bold leading-none transition-colors',
                      active ? 'text-accent' : 'text-muted',
                    )}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
