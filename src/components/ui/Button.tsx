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
    'bg-accent text-white shadow-soft hover:brightness-[1.05] active:brightness-95',
  soft: 'bg-accent-soft text-accent hover:brightness-[0.98] active:brightness-95',
  ghost: 'bg-transparent text-text hover:bg-surface-2 active:bg-surface-2',
  outline: 'border border-line bg-surface text-text hover:bg-surface-2',
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
        'inline-flex select-none items-center justify-center gap-2 rounded-pill font-medium transition-all duration-200 ease-gentle disabled:cursor-not-allowed disabled:opacity-50',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  );
});
