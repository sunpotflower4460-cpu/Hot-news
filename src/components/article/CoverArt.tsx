import { getCategory } from '@/mock/categories';
import type { CategoryId } from '@/types/article';
import { cn } from '@/lib/utils/cn';

interface CoverArtProps {
  category: CategoryId;
  seed?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CoverArt({ category, seed = '', className, size = 'md' }: CoverArtProps) {
  const meta = getCategory(category);
  const code = seed.charCodeAt(seed.length - 1) || 0;
  const tilt = code % 2 === 0 ? -7 : 7;
  const glyphSize = size === 'lg' ? 'text-[4.8rem]' : size === 'sm' ? 'text-[2.15rem]' : 'text-5xl';
  const orbSize = size === 'lg' ? 'h-36 w-36' : size === 'sm' ? 'h-16 w-16' : 'h-24 w-24';

  return (
    <div
      aria-hidden
      className={cn('relative isolate overflow-hidden bg-accent-soft', className)}
      style={{
        background: [
          `radial-gradient(circle at 78% 18%, hsl(${meta.accent} / 0.6), transparent 35%)`,
          `radial-gradient(circle at 12% 88%, hsl(${meta.accent} / 0.28), transparent 42%)`,
          `linear-gradient(145deg, hsl(${meta.accent} / 0.12), hsl(${meta.accent} / 0.34))`,
        ].join(', '),
      }}
    >
      <div className="absolute -left-[12%] -top-[26%] h-[75%] w-[72%] rotate-12 rounded-[48%_52%_64%_36%/50%_34%_66%_50%] bg-white/34 blur-[1px]" />
      <div className="absolute -bottom-[36%] right-[-15%] h-[86%] w-[78%] -rotate-12 rounded-[38%_62%_44%_56%/60%_40%_60%_40%] bg-white/22 blur-[2px]" />
      <div className="absolute left-[18%] top-[18%] h-3 w-3 animate-float rounded-full border border-white/55 bg-white/20" />
      <div className="absolute bottom-[17%] left-[10%] h-5 w-5 animate-float rounded-full border border-white/45 bg-white/15 [animation-delay:-2s]" />
      <div className="absolute right-[12%] top-[12%] h-8 w-8 rounded-full bg-white/18 blur-md" />

      <div
        className={cn(
          'ambient-ring absolute right-[9%] top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/34 shadow-glow backdrop-blur-sm',
          orbSize,
        )}
      >
        <div
          className={cn('select-none drop-shadow-sm', glyphSize)}
          style={{ transform: `rotate(${tilt}deg)` }}
        >
          {meta.glyph}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/8 to-transparent" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/24" />
    </div>
  );
}
