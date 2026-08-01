'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useResolvedTheme } from './ThemeProvider';
import { getSkyPalette } from '@/lib/theme/palettes';

const STARS = Array.from({ length: 30 }, (_, i) => ({
  left: (i * 37.6) % 100,
  top: (i * 23.3) % 50,
  size: (i % 3) + 1.4,
  delay: (i % 7) * 0.65,
}));

const BUBBLES = Array.from({ length: 8 }, (_, i) => ({
  left: (i * 29.4 + 8) % 96,
  top: (i * 17.8 + 10) % 58,
  size: 18 + (i % 4) * 10,
  delay: -(i % 5) * 1.1,
}));

function Cloud({ className }: { className: string }) {
  return (
    <div className={className}>
      <span className="absolute bottom-0 left-[8%] h-[62%] w-[42%] rounded-full bg-white/52 blur-[1px]" />
      <span className="absolute bottom-0 left-[32%] h-[88%] w-[46%] rounded-full bg-white/58 blur-[1px]" />
      <span className="absolute bottom-0 right-[4%] h-[58%] w-[40%] rounded-full bg-white/48 blur-[1px]" />
      <span className="absolute bottom-0 left-0 h-[44%] w-full rounded-full bg-white/45 blur-[2px]" />
    </div>
  );
}

export function SkyBackground({ full = false }: { full?: boolean }) {
  const { mode, time } = useResolvedTheme();
  const sky = getSkyPalette(mode, time);
  const skyKey = `${mode}-${time}`;
  const isDark = mode === 'dark';

  return (
    <div
      aria-hidden
      className={
        full
          ? 'pointer-events-none absolute inset-0 z-0 overflow-hidden'
          : 'pointer-events-none absolute inset-x-0 top-0 z-0 h-[74vh] overflow-hidden [mask-image:linear-gradient(to_bottom,black_72%,transparent_100%)]'
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={skyKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={{
            background: [
              `radial-gradient(circle at 20% 12%, hsl(${sky.from} / ${isDark ? 0.34 : 0.72}), transparent 34%)`,
              `radial-gradient(circle at 84% 5%, hsl(var(--accent-soft) / ${isDark ? 0.18 : 0.48}), transparent 31%)`,
              `linear-gradient(180deg, hsl(${sky.from}) 0%, hsl(${sky.to}) 64%, hsl(var(--bg)) 100%)`,
            ].join(', '),
          }}
        >
          <div className="absolute left-1/2 top-[7%] h-44 w-44 -translate-x-1/2 animate-breathe rounded-full bg-white/25 blur-3xl" />

          {sky.motif !== 'stars' && (
            <>
              <div className="ambient-ring absolute right-[8%] top-[8%] h-24 w-24 animate-float rounded-full bg-white/32 backdrop-blur-sm">
                <div className="absolute inset-[18%] rounded-full bg-white/44 blur-md" />
              </div>
              <Cloud className="absolute left-[-12%] top-[18%] h-24 w-64 animate-drift opacity-55 blur-[0.5px]" />
              <Cloud className="absolute right-[-18%] top-[32%] h-20 w-56 animate-drift-reverse opacity-42 blur-[1px]" />
              <Cloud className="absolute left-[20%] top-[48%] h-16 w-44 animate-drift opacity-28 blur-[2px] [animation-delay:-9s]" />
              <div className="absolute inset-x-0 bottom-[12%] h-28 bg-gradient-to-b from-transparent via-white/10 to-white/30 blur-2xl" />
            </>
          )}

          {sky.motif === 'stars' && (
            <div className="absolute inset-0">
              {STARS.map((star, i) => (
                <span
                  key={i}
                  className="absolute animate-twinkle rounded-full bg-white"
                  style={{
                    left: `${star.left}%`,
                    top: `${star.top}%`,
                    width: star.size,
                    height: star.size,
                    animationDelay: `${star.delay}s`,
                  }}
                />
              ))}
              <div className="ambient-ring absolute right-[13%] top-[9%] h-20 w-20 animate-float rounded-full bg-white/76 blur-[0.5px]">
                <div className="absolute -left-2 top-2 h-16 w-16 rounded-full bg-bg/45" />
              </div>
              <div className="absolute left-[8%] top-[42%] h-28 w-72 animate-drift rounded-full bg-white/6 blur-3xl" />
            </div>
          )}

          {BUBBLES.map((bubble, i) => (
            <span
              key={i}
              className="ambient-ring absolute animate-float rounded-full bg-white/10 backdrop-blur-[1px]"
              style={{
                left: `${bubble.left}%`,
                top: `${bubble.top}%`,
                width: bubble.size,
                height: bubble.size,
                animationDelay: `${bubble.delay}s`,
              }}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
