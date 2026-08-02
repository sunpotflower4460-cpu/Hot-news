'use client';

import Link from 'next/link';
import { Moon, ShieldCheck, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useResolvedTheme } from '@/components/theme/ThemeProvider';
import { TIME_GREETINGS_JA, TIME_SUBTITLES_JA } from '@/lib/theme/timeOfDay';
import { formatJaDate } from '@/lib/utils/date';
import { useHydrated } from '@/lib/utils/useHydrated';

export function HomeGreeting() {
  const { time } = useResolvedTheme();
  const hydrated = useHydrated();
  const showNight = hydrated && (time === 'evening' || time === 'night');

  return (
    <div className="safe-top px-5 pb-1">
      <motion.header
        initial={{ opacity: 0, y: 10, scale: 0.995 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        className="soft-surface relative overflow-hidden rounded-panel px-5 py-4 shadow-float"
      >
        <div
          aria-hidden
          className="absolute -right-10 -top-12 h-36 w-36 animate-breathe rounded-full bg-accent-soft/75 blur-2xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-12 left-1/3 h-24 w-36 rounded-full bg-white/35 blur-2xl"
        />

        <div className="relative z-10 flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-[0.72rem] font-semibold tracking-[0.04em] text-muted">
              {formatJaDate(new Date().toISOString())}
            </p>
            <h1 className="mt-1 text-[1.55rem] font-bold leading-[1.45] text-text">
              {TIME_GREETINGS_JA[time]}
            </h1>
            <p className="mt-1 max-w-[18rem] text-caption leading-relaxed text-muted">
              {TIME_SUBTITLES_JA[time]}
            </p>
          </div>

          <span className="ambient-ring flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/28 text-accent shadow-glow backdrop-blur-sm">
            <Sun aria-hidden size={24} strokeWidth={1.8} className="fill-accent/15" />
          </span>
        </div>

        <div className="relative z-10 mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex min-h-9 items-center gap-1.5 rounded-pill border border-white/45 bg-white/32 px-3 text-[0.72rem] font-semibold text-text/85 shadow-inner-light backdrop-blur-md">
            <ShieldCheck aria-hidden size={13} className="text-accent" />
            出来事そのものが明るいニュースだけ
          </span>

          {showNight && (
            <Link
              href="/night"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-pill border border-line/55 bg-surface/70 px-3 text-[0.72rem] font-semibold text-accent shadow-soft backdrop-blur transition-all duration-300 ease-gentle hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0"
            >
              <Moon aria-hidden size={13} />
              寝る前の1本
            </Link>
          )}
        </div>
      </motion.header>
    </div>
  );
}
