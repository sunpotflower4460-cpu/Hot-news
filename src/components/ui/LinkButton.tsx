import Link, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes } from 'react';
import {
  buttonStyles,
  type ButtonSize,
  type ButtonVariant,
} from '@/components/ui/Button';

interface LinkButtonProps
  extends LinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function LinkButton({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: LinkButtonProps) {
  return <Link className={buttonStyles({ variant, size, className })} {...props} />;
}
