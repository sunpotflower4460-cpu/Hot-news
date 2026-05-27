import type { HTMLAttributes } from 'react';
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
        color: active ? '#fff' : `hsl(${accent})`,
        ...style,
      } as React.CSSProperties)
    : style;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-pill px-3 py-1 text-caption font-medium leading-none',
        !accent && (active ? 'bg-accent text-white' : 'bg-surface-2 text-muted'),
        className,
      )}
      style={accentStyle}
      {...props}
    >
      {children}
    </span>
  );
}
