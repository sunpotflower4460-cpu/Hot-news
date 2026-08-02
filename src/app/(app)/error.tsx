'use client';

import { useEffect } from 'react';
import { CloudSun, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { captureException } from '@/lib/telemetry/client';

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureException(error, {
      errorType: error.name,
      hasDigest: Boolean(error.digest),
    });

    if (process.env.NODE_ENV !== 'production') {
      console.error('Hot News route error', error);
    }
  }, [error]);

  return (
    <div className="flex min-h-full items-center justify-center px-5 py-12">
      <section
        role="alert"
        className="soft-surface w-full max-w-sm rounded-panel px-6 py-9 text-center shadow-float"
      >
        <div className="ambient-ring mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/35 text-accent shadow-glow">
          <CloudSun aria-hidden size={36} strokeWidth={1.6} />
        </div>
        <h1 className="mt-5 text-h2 font-bold text-text">うまく開けませんでした</h1>
        <p className="mt-2 text-body leading-relaxed text-muted">
          通信や一時的な問題かもしれません。もう一度ひらくか、ホームへ戻ってください。
        </p>
        <div className="mt-6 flex flex-col gap-2.5">
          <Button size="lg" onClick={reset} className="w-full">
            <RotateCcw aria-hidden size={17} />
            もう一度ひらく
          </Button>
          <LinkButton href="/home" variant="ghost" size="md" className="w-full">
            ホームへもどる
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
