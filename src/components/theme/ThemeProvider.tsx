'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useThemeStore } from '@/lib/store/useThemeStore';
import { resolveTimeOfDay } from '@/lib/theme/timeOfDay';
import type { ThemeMode, TimeOfDay } from '@/lib/theme/types';

interface ResolvedTheme {
  mode: ThemeMode;
  time: TimeOfDay;
  /** True while on the 寝る前モード route (night palette forced). */
  forcedNight: boolean;
}

const ThemeContext = createContext<ResolvedTheme>({
  mode: 'light',
  time: 'day',
  forcedNight: false,
});

export function useResolvedTheme() {
  return useContext(ThemeContext);
}

function systemPrefersDark() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const pref = useThemeStore((s) => s.pref);
  const timeOverride = useThemeStore((s) => s.timeOverride);
  const fontScale = useThemeStore((s) => s.fontScale);
  const pathname = usePathname();
  const forcedNight = pathname?.startsWith('/night') ?? false;

  const [systemDark, setSystemDark] = useState(false);
  const [clockTime, setClockTime] = useState<TimeOfDay>('day');

  // Keep the clock-derived phase fresh (minute granularity + on focus).
  useEffect(() => {
    const update = () => setClockTime(resolveTimeOfDay());
    update();
    const id = setInterval(update, 60_000);
    window.addEventListener('focus', update);
    return () => {
      clearInterval(id);
      window.removeEventListener('focus', update);
    };
  }, []);

  // Track OS color-scheme for "auto".
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setSystemDark(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const resolved = useMemo<ResolvedTheme>(() => {
    let mode: ThemeMode =
      pref === 'light' ? 'light' : pref === 'dark' ? 'dark' : systemDark ? 'dark' : 'light';
    let time: TimeOfDay = timeOverride ?? clockTime;
    if (forcedNight) {
      mode = 'dark';
      time = 'night';
    }
    return { mode, time, forcedNight };
  }, [pref, systemDark, timeOverride, clockTime, forcedNight]);

  // Write the two orthogonal axes onto <html>.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', resolved.mode);
    root.setAttribute('data-time', resolved.time);
    root.style.colorScheme = resolved.mode;
  }, [resolved.mode, resolved.time]);

  // Text-size axis is independent of theme/time.
  useEffect(() => {
    document.documentElement.setAttribute('data-textsize', fontScale);
  }, [fontScale]);

  return <ThemeContext.Provider value={resolved}>{children}</ThemeContext.Provider>;
}
