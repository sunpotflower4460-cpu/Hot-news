'use client';

import Link from 'next/link';
import { Moon, Sun, Sunrise, Sunset } from 'lucide-react';
import { useResolvedTheme } from '@/components/theme/ThemeProvider';
import { TIME_GREETINGS_JA, TIME_SUBTITLES_JA } from '@/lib/theme/timeOfDay';
import { formatJaDate } from '@/lib/utils/date';
import { useHydrated } from '@/lib/utils/useHydrated';
import type { TimeOfDay } from '@/lib/theme/types';

const WEATHER_ICON: Record<TimeOfDay, typeof Sun> = {
  morning: Sunrise,
  day: Sun,
  evening: Sunset,
  night: Moon,
};

export function HomeGreeting() {
  const { time } = useResolvedTheme();
  const hydrated = useHydrated();
  const showNight = hydrated && (time === 'evening' || time === 'night');
  const WeatherIcon = WEATHER_ICON[time];

  return (
    <div className="safe-top px-5 pb-1 pt-6">
      <p className="text-caption text-muted">{formatJaDate(new Date().toISOString())}</p>
      <div className="mt-1 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="font-rounded text-display font-bold text-text">{TIME_GREETINGS_JA[time]}</h1>
          <p className="mt-1 text-body text-muted">{TIME_SUBTITLES_JA[time]}</p>
        </div>
        <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface/70 text-accent shadow-soft backdrop-blur">
          <WeatherIcon size={22} />
        </span>
      </div>
      {showNight && (
        <Link
          href="/night"
          className="mt-3 inline-flex items-center gap-1.5 rounded-pill bg-surface/70 px-3 py-1.5 text-caption font-medium text-text shadow-soft backdrop-blur"
        >
          <Moon size={14} className="text-accent" />
          寝る前モードでひとつだけ読む
        </Link>
      )}
    </div>
  );
}
