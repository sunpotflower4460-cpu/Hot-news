'use client';

import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFavoritesStore } from '@/lib/store/useFavoritesStore';
import { useHydrated } from '@/lib/utils/useHydrated';
import { cn } from '@/lib/utils/cn';

interface SaveButtonProps {
  id: string;
  variant?: 'glass' | 'plain';
  className?: string;
}

export function SaveButton({ id, variant = 'glass', className }: SaveButtonProps) {
  const hydrated = useHydrated();
  const ids = useFavoritesStore((s) => s.ids);
  const toggle = useFavoritesStore((s) => s.toggle);
  const saved = hydrated && ids.includes(id);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? 'お気に入りから外す' : 'お気に入りに保存'}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      className={cn(
        'flex h-11 w-11 items-center justify-center rounded-full transition-colors',
        variant === 'glass' ? 'glass border border-line/60' : 'bg-transparent',
        className,
      )}
    >
      <motion.span
        key={saved ? 'on' : 'off'}
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
      >
        <Heart
          size={20}
          strokeWidth={2}
          className={cn(saved ? 'fill-accent text-accent' : 'text-text/70')}
        />
      </motion.span>
    </button>
  );
}
