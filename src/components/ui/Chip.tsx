import type { CSSProperties, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  /** HSL channel accent for category-tinted chips. */
  accent?: string;
  active?: boolean;
}

export function Chip({ accent, active = false, className, style, children, ...props }: ChipProps) {
  const accentStyle = accent
    ? ({
        backgroundColor: active ? `hsl(${accent})` : `hsl(${accent} / 0.14)`,
        color: active ? 'hsl(220 25% 18%)' : `hsl(${accent})`,
        ...style,
      } as CSSProperties)
    : style;

  return (
    <span
      className={cn(
        'inline-flex min-h-9 items-center gap-1 rounded-pill px-3 py-1.5 text-caption font-semibold leading-none shadow-inner-light',
        !accent && (active ? 'bg-accent-strong text-white' : 'bg-surface-2 text-muted'),
        className,
      )}
      style={accentStyle}
      {...props}
    >
      {children}
    </span>
  );
}
