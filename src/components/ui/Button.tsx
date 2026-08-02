'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export type ButtonVariant = 'primary' | 'soft' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'border border-white/20 bg-accent-strong text-white shadow-glow hover:-translate-y-0.5 hover:brightness-[1.04] active:translate-y-[1px] active:scale-[0.985] active:brightness-95',
  soft:
    'border border-accent/10 bg-accent-soft/85 text-accent shadow-inner-light hover:-translate-y-0.5 hover:bg-accent-soft active:translate-y-[1px] active:scale-[0.985]',
  ghost:
    'bg-transparent text-text hover:bg-surface/60 active:scale-[0.985] active:bg-surface-2',
  outline:
    'border border-line/65 bg-surface/72 text-text shadow-inner-light backdrop-blur hover:-translate-y-0.5 hover:border-accent/20 hover:shadow-soft active:translate-y-[1px] active:scale-[0.985]',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'min-h-10 px-4 text-caption',
  md: 'min-h-11 px-5 text-body',
  lg: 'min-h-14 px-7 text-body-lg',
};

export function buttonStyles({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    'inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-pill font-semibold transition-all duration-300 ease-gentle disabled:cursor-not-allowed disabled:opacity-50',
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
});
