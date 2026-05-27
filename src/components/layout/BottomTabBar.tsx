'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpenText, Compass, Heart, Home, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

const TABS = [
  { href: '/home', label: 'ホーム', Icon: Home },
  { href: '/browse', label: 'さがす', Icon: Compass },
  { href: '/favorites', label: 'お気に入り', Icon: Heart },
  { href: '/digest', label: 'まとめ', Icon: BookOpenText },
  { href: '/settings', label: '設定', Icon: Settings },
] as const;

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="safe-bottom glass z-30 shrink-0 border-t border-line/60">
      <ul className="flex items-stretch justify-around px-2 pt-1.5">
        {TABS.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className="relative flex flex-col items-center gap-1 rounded-2xl px-1 py-1.5"
              >
                {active && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-x-2 top-0 h-9 rounded-2xl bg-accent-soft"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <Icon
                  size={22}
                  strokeWidth={active ? 2.4 : 1.9}
                  className={cn('relative z-10 transition-colors', active ? 'text-accent' : 'text-muted')}
                />
                <span
                  className={cn(
                    'relative z-10 text-[0.66rem] font-medium leading-none transition-colors',
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
    </nav>
  );
}
