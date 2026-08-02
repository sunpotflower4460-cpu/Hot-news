'use client';

import { Heart, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useFavoritesStore } from '@/lib/store/useFavoritesStore';
import { useHydrated } from '@/lib/utils/useHydrated';
import { cn } from '@/lib/utils/cn';

interface SaveButtonProps {
  id: string;
  articleTitle?: string;
  variant?: 'glass' | 'plain';
  className?: string;
}

export function SaveButton({ id, articleTitle, variant = 'glass', className }: SaveButtonProps) {
  const hydrated = useHydrated();
  const ids = useFavoritesStore((state) => state.ids);
  const toggle = useFavoritesStore((state) => state.toggle);
  const saved = hydrated && ids.includes(id);
  const target = articleTitle ? `「${articleTitle}」を` : '';

  return (
    <button
      type="button"
      disabled={!hydrated}
      aria-pressed={saved}
      aria-label={saved ? `${target}お気に入りから外す` : `${target}お気に入りに保存`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(id);
      }}
      className={cn(
        'relative flex h-11 w-11 items-center justify-center overflow-visible rounded-full transition-all duration-300 ease-gentle active:scale-90 disabled:cursor-wait disabled:opacity-55',
        variant === 'glass'
          ? 'glass border hover:-translate-y-0.5 hover:shadow-glow'
          : 'bg-transparent',
        saved && 'border-accent/20 bg-accent-soft/80 shadow-glow',
        className,
      )}
    >
      <AnimatePresence>
        {saved && (
          <motion.span
            aria-hidden
            initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute -right-1 -top-1 text-accent"
          >
            <Sparkles size={12} />
          </motion.span>
        )}
      </AnimatePresence>
      <motion.span
        aria-hidden
        key={saved ? 'on' : 'off'}
        initial={{ scale: 0.58, rotate: saved ? -12 : 0 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 460, damping: 17 }}
      >
        <Heart
          size={19}
          strokeWidth={2}
          className={cn(saved ? 'fill-accent text-accent' : 'text-text/70')}
        />
      </motion.span>
    </button>
  );
}
