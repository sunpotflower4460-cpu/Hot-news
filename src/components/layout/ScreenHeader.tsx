'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import type { ReactNode } from 'react';

interface ScreenHeaderProps {
  title?: string;
  subtitle?: string;
  back?: boolean;
  action?: ReactNode;
}

export function ScreenHeader({ title, subtitle, back = false, action }: ScreenHeaderProps) {
  const router = useRouter();

  return (
    <header className="safe-top relative z-20 flex items-start gap-3 px-5 pb-2 pt-5">
      {back && (
        <button
          aria-label="戻る"
          onClick={() => router.back()}
          className="glass -ml-1 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line/60 text-text"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      <div className="min-w-0 flex-1">
        {title && <h1 className="truncate text-h1 text-text">{title}</h1>}
        {subtitle && <p className="mt-0.5 text-caption text-muted">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
