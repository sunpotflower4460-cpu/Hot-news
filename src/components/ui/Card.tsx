import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, inset = false, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-card border border-line/70 bg-surface shadow-soft',
        inset && 'p-5',
        className,
      )}
      {...props}
    />
  );
});
