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

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push('/home');
  };

  return (
    <header className="safe-top relative z-20 flex items-start gap-3 px-5 pb-3 pt-5">
      {back && (
        <button
          type="button"
          aria-label="前の画面へ戻る"
          onClick={goBack}
          className="glass float-card -ml-1 mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-text"
        >
          <ChevronLeft size={20} strokeWidth={2.1} />
        </button>
      )}
      <div className="min-w-0 flex-1 pt-0.5">
        {title && <h1 className="truncate text-h1 font-bold text-text">{title}</h1>}
        {subtitle && <p className="mt-1 max-w-sm text-caption text-muted">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
