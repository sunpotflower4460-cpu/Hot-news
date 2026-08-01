'use client';

import Link from 'next/link';
import { Moon, Sparkles, Sun } from 'lucide-react';
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
    <div className="safe-top px-5 pb-1 pt-5">
      <motion.section
        initial={{ opacity: 0, y: 12, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="soft-surface relative overflow-hidden rounded-panel px-5 pb-5 pt-4 shadow-float"
      >
        <div className="absolute -right-8 -top-10 h-36 w-36 animate-breathe rounded-full bg-accent-soft/70 blur-2xl" />
        <div className="absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-white/35 blur-2xl" />
        <div className="absolute right-5 top-5 h-16 w-16 animate-float rounded-full border border-white/45 bg-white/20 shadow-inner-light backdrop-blur-sm">
          <div className="absolute inset-2.5 flex items-center justify-center rounded-full bg-accent-soft/70 text-accent shadow-glow">
            <Sun size={25} strokeWidth={1.8} className="fill-accent/15" />
          </div>
        </div>

        <div className="relative z-10 pr-16">
          <div className="inline-flex items-center gap-1.5 rounded-pill border border-white/45 bg-white/35 px-3 py-1 text-[0.7rem] font-medium text-muted shadow-inner-light backdrop-blur-md">
            <Sparkles size={12} className="text-accent" />
            心の天気　晴れ
          </div>
          <p className="mt-4 text-caption font-medium tracking-[0.04em] text-muted">
            {formatJaDate(new Date().toISOString())}
          </p>
          <h1 className="mt-1 text-display font-bold text-text">{TIME_GREETINGS_JA[time]}</h1>
          <p className="mt-1.5 max-w-[18rem] text-body text-muted">{TIME_SUBTITLES_JA[time]}</p>
        </div>

        {showNight && (
          <Link
            href="/night"
            className="relative z-10 mt-4 inline-flex items-center gap-2 rounded-pill border border-line/50 bg-surface/70 px-3.5 py-2 text-caption font-medium text-text shadow-soft backdrop-blur transition-all duration-300 ease-gentle hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-accent">
              <Moon size={13} />
            </span>
            寝る前に、明るい話をひとつ
          </Link>
        )}
      </motion.section>
    </div>
  );
}
