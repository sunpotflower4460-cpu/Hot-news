export type TimeOfDay = 'morning' | 'day' | 'evening' | 'night';
export type ThemeMode = 'light' | 'dark';
/** User preference: follow clock + OS, force light, or force dark. */
export type ThemePref = 'auto' | 'light' | 'dark';

export interface SkyPalette {
  /** Top of the sky gradient — HSL channels "H S% L%". */
  from: string;
  /** Bottom of the sky gradient. */
  to: string;
  /** Decorative motif: soft clouds by day, stars by night. */
  motif: 'clouds' | 'stars' | 'glow';
}
