'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

type Variant = 'primary' | 'soft' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    'border border-white/20 bg-accent text-white shadow-glow hover:-translate-y-0.5 hover:brightness-[1.04] active:translate-y-[1px] active:scale-[0.985] active:brightness-95',
  soft:
    'border border-accent/10 bg-accent-soft/80 text-accent shadow-inner-light hover:-translate-y-0.5 hover:bg-accent-soft active:translate-y-[1px] active:scale-[0.985]',
  ghost:
    'bg-transparent text-text hover:bg-surface/60 active:scale-[0.985] active:bg-surface-2',
  outline:
    'border border-line/65 bg-surface/70 text-text shadow-inner-light backdrop-blur hover:-translate-y-0.5 hover:border-accent/20 hover:shadow-soft active:translate-y-[1px] active:scale-[0.985]',
};

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-4 text-caption',
  md: 'h-11 px-5 text-body',
  lg: 'h-14 px-7 text-body-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-pill font-semibold transition-all duration-300 ease-gentle disabled:cursor-not-allowed disabled:opacity-50',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  );
});
