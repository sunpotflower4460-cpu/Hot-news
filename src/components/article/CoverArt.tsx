import { getCategory } from '@/mock/categories';
import type { CategoryId } from '@/types/article';
import { cn } from '@/lib/utils/cn';

interface CoverArtProps {
  category: CategoryId;
  /** Index of glyph repetition is derived from id for gentle variety. */
  seed?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Image-free cover: a soft gradient tinted by the category accent with the
 * category glyph floating in it. Lets every card look intentional without
 * relying on external photography (and honors the spec's no-image publish mode).
 */
export function CoverArt({ category, seed = '', className, size = 'md' }: CoverArtProps) {
  const meta = getCategory(category);
  const tilt = (seed.charCodeAt(seed.length - 1) || 0) % 2 === 0 ? -8 : 8;
  const glyphSize = size === 'lg' ? 'text-[5.5rem]' : size === 'sm' ? 'text-3xl' : 'text-5xl';

  return (
    <div
      aria-hidden
      className={cn('relative overflow-hidden', className)}
      style={{
        background: `radial-gradient(120% 120% at 80% 10%, hsl(${meta.accent} / 0.85), hsl(${meta.accent} / 0.45) 45%, hsl(${meta.accent} / 0.2) 100%)`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-white/25" />
      <div className="absolute -left-6 -top-8 h-24 w-24 rounded-full bg-white/30 blur-2xl" />
      <div
        className={cn('absolute -right-2 -top-1 opacity-90 drop-shadow-lg', glyphSize)}
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        {meta.glyph}
      </div>
    </div>
  );
}
