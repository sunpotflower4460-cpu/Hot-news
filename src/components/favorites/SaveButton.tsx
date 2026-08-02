'use client';

import { Bookmark, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/useI18n';
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
  const { locale, t } = useI18n();
  const ids = useFavoritesStore((state) => state.ids);
  const toggle = useFavoritesStore((state) => state.toggle);
  const saved = hydrated && ids.includes(id);
  const label = articleTitle
    ? locale === 'ja'
      ? saved
        ? `「${articleTitle}」を保存から外す`
        : `「${articleTitle}」をあとで読むために保存`
      : saved
        ? `Remove “${articleTitle}” from saved stories`
        : `Save “${articleTitle}” for later`
    : saved
      ? locale === 'ja'
        ? '保存から外す'
        : 'Remove from saved stories'
      : t('common.save');

  return (
    <button
      type="button"
      title={saved ? (locale === 'ja' ? '保存から外す' : 'Remove from saved') : t('common.save')}
      disabled={!hydrated}
      aria-pressed={saved}
      aria-label={label}
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
        initial={{ scale: 0.58, rotate: saved ? -8 : 0 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 460, damping: 17 }}
      >
        <Bookmark
          size={19}
          strokeWidth={2}
          className={cn(saved ? 'fill-accent text-accent' : 'text-text/70')}
        />
      </motion.span>
    </button>
  );
}
