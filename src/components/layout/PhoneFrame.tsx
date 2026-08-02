import type { ReactNode } from 'react';

/**
 * Edge-to-edge on real phones; a calm floating canvas on larger screens.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] justify-center bg-surface-2/45 md:items-center md:bg-[radial-gradient(circle_at_50%_10%,hsl(var(--accent-soft)/0.48),transparent_34rem)]">
      <div className="relative flex h-[100dvh] w-full max-w-phone flex-col overflow-hidden bg-bg md:h-[min(920px,calc(100dvh-2.5rem))] md:rounded-[2.8rem] md:border md:border-white/45 md:shadow-[0_38px_100px_-42px_hsl(var(--shadow)/0.55),inset_0_1px_0_hsl(0_0%_100%/0.55)]">
        {children}
      </div>
    </div>
  );
}
