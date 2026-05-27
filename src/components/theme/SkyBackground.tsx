'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useResolvedTheme } from './ThemeProvider';
import { getSkyPalette } from '@/lib/theme/palettes';

// Deterministic positions so SSR and client render identically.
const STARS = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 37.6) % 100,
  top: (i * 23.3) % 46,
  size: (i % 3) + 1.5,
  delay: (i % 7) * 0.6,
}));

export function SkyBackground({ full = false }: { full?: boolean }) {
  const { mode, time } = useResolvedTheme();
  const sky = getSkyPalette(mode, time);
  const skyKey = `${mode}-${time}`;

  return (
    <div
      aria-hidden
      className={
        full
          ? 'pointer-events-none absolute inset-0 z-0 overflow-hidden'
          : 'pointer-events-none absolute inset-x-0 top-0 z-0 h-[58vh] overflow-hidden'
      }
    >
      <AnimatePresence>
        <motion.div
          key={skyKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, hsl(${sky.from}) 0%, hsl(${sky.to}) 70%, hsl(var(--bg)) 100%)`,
          }}
        >
          {sky.motif === 'stars' && (
            <div className="absolute inset-0">
              {STARS.map((s, i) => (
                <span
                  key={i}
                  className="absolute rounded-full bg-white animate-twinkle"
                  style={{
                    left: `${s.left}%`,
                    top: `${s.top}%`,
                    width: s.size,
                    height: s.size,
                    animationDelay: `${s.delay}s`,
                  }}
                />
              ))}
              <div
                className="absolute right-[14%] top-[10%] h-16 w-16 rounded-full bg-white/85 blur-[1px]"
                style={{ boxShadow: '0 0 40px 8px rgba(255,255,255,0.35)' }}
              />
            </div>
          )}

          {sky.motif === 'clouds' && (
            <div className="absolute inset-0">
              <div className="animate-drift absolute left-[6%] top-[18%] h-16 w-44 rounded-full bg-white/45 blur-2xl" />
              <div className="animate-drift absolute right-[2%] top-[8%] h-20 w-56 rounded-full bg-white/35 blur-3xl [animation-delay:-6s]" />
              <div className="animate-drift absolute left-[34%] top-[34%] h-14 w-40 rounded-full bg-white/30 blur-2xl [animation-delay:-11s]" />
            </div>
          )}

          {sky.motif === 'glow' && (
            <div className="absolute inset-0">
              <div className="absolute left-1/2 top-[6%] h-48 w-48 -translate-x-1/2 rounded-full bg-white/35 blur-3xl" />
              <div className="animate-drift absolute left-[10%] top-[30%] h-16 w-48 rounded-full bg-white/20 blur-3xl" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
