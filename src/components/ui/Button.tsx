'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { buttonStyles, type ButtonSize, type ButtonVariant } from '@/components/ui/buttonStyles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export type { ButtonSize, ButtonVariant } from '@/components/ui/buttonStyles';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, ...props },
  ref,
) {
  return <button ref={ref} className={buttonStyles({ variant, size, className })} {...props} />;
});
