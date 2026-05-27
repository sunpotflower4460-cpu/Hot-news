import { Sun } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ComfortScoreProps {
  /** 0–100. Shown as a gentle 5-level "ほっと度", never a raw number. */
  score: number;
  showLabel?: boolean;
  className?: string;
}

export function ComfortScore({ score, showLabel = true, className }: ComfortScoreProps) {
  const level = Math.max(1, Math.min(5, Math.round(score / 20)));

  return (
    <div
      className={cn('inline-flex items-center gap-1.5', className)}
      role="img"
      aria-label={`ほっと度 5段階中 ${level}`}
    >
      {showLabel && <span className="text-[0.7rem] font-medium text-muted">ほっと度</span>}
      <span className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Sun
            key={i}
            size={12}
            strokeWidth={2}
            className={cn(i < level ? 'fill-accent text-accent' : 'text-line')}
          />
        ))}
      </span>
    </div>
  );
}
