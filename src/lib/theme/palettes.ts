import type { SkyPalette, ThemeMode, TimeOfDay } from './types';

/**
 * Canonical, typed source of truth for the sky gradient. The semantic surface
 * tokens (--bg, --text, ...) live in globals.css; SkyBackground reads these.
 */
export const SKY_PALETTES: Record<ThemeMode, Record<TimeOfDay, SkyPalette>> = {
  light: {
    morning: { from: '35 100% 90%', to: '200 65% 88%', motif: 'clouds' },
    day: { from: '202 80% 86%', to: '190 60% 92%', motif: 'clouds' },
    evening: { from: '24 90% 80%', to: '320 45% 82%', motif: 'glow' },
    night: { from: '232 38% 30%', to: '250 30% 18%', motif: 'stars' },
  },
  dark: {
    morning: { from: '28 35% 24%', to: '210 30% 18%', motif: 'glow' },
    day: { from: '212 30% 22%', to: '200 25% 16%', motif: 'clouds' },
    evening: { from: '300 28% 22%', to: '258 30% 16%', motif: 'glow' },
    night: { from: '240 34% 14%', to: '258 30% 8%', motif: 'stars' },
  },
};

export function getSkyPalette(mode: ThemeMode, time: TimeOfDay): SkyPalette {
  return SKY_PALETTES[mode][time];
}
