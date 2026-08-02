import Link from 'next/link';
import type { ComponentProps } from 'react';
import { buttonStyles, type ButtonSize, type ButtonVariant } from '@/components/ui/Button';

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function LinkButton({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: LinkButtonProps) {
  return <Link className={buttonStyles({ variant, size, className })} {...props} />;
}
