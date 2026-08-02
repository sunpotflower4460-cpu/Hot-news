'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export function ShareArticleButton({ title, summary }: { title: string; summary: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const resetLater = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setStatus('idle'), 2600);
  };

  const share = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title, text: summary, url });
        return;
      }

      await navigator.clipboard.writeText(url);
      setStatus('copied');
      resetLater();
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setStatus('error');
      resetLater();
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={share}
        className={cn(
          'flex min-h-12 w-full items-center justify-center gap-2 rounded-pill border px-4 text-body font-bold transition-all duration-300 active:scale-[0.985]',
          status === 'copied'
            ? 'border-accent/20 bg-accent-soft text-accent shadow-inner-light'
            : 'border-line/60 bg-surface/75 text-text shadow-soft hover:-translate-y-0.5 hover:shadow-glow',
        )}
      >
        {status === 'copied' ? (
          <>
            <Check aria-hidden size={17} />
            リンクをコピーしました
          </>
        ) : (
          navigatorShareLabel(status)
        )}
      </button>
      {status === 'error' && (
        <p role="status" className="mt-2 text-center text-caption text-muted">
          共有できませんでした。ブラウザのアドレス欄からリンクをコピーしてください。
        </p>
      )}
    </div>
  );
}

function navigatorShareLabel(status: 'idle' | 'copied' | 'error') {
  if (status === 'error') {
    return (
      <>
        <Copy aria-hidden size={17} />
        もう一度共有する
      </>
    );
  }

  return (
    <>
      <Share2 aria-hidden size={17} />
      このニュースを共有する
    </>
  );
}
