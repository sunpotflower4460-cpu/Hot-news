'use client';

import { cn } from '@/lib/utils/cn';

interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  id?: string;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, label, id, disabled = false }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className="relative inline-flex h-11 w-14 shrink-0 items-center rounded-pill disabled:cursor-not-allowed disabled:opacity-45"
    >
      <span
        aria-hidden
        className={cn(
          'absolute inset-x-0 top-1.5 h-8 rounded-pill border transition-all duration-300 ease-gentle',
          checked
            ? 'border-accent/20 bg-accent shadow-glow'
            : 'border-line/70 bg-surface-2/85 shadow-inner-light',
        )}
      />
      <span
        aria-hidden
        className={cn(
          'relative h-6 w-6 rounded-full bg-white shadow-soft transition-transform duration-300 ease-gentle',
          checked ? 'translate-x-7' : 'translate-x-1',
        )}
      />
    </button>
  );
}
