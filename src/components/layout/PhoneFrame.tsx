import type { ReactNode } from 'react';

/**
 * Edge-to-edge on real phones; a centered device frame on larger screens so
 * the bottom tab bar stays bound to the app width (the frame is the scroll
 * container, not the window).
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] justify-center bg-surface-2 md:items-center">
      <div className="relative flex h-[100dvh] w-full max-w-phone flex-col overflow-hidden bg-bg md:h-[min(900px,calc(100dvh-3rem))] md:rounded-[2.4rem] md:border md:border-black/10 md:shadow-soft-lg">
        {children}
      </div>
    </div>
  );
}
