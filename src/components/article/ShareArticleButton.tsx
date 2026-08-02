'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy, Share2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/useI18n';
import { cn } from '@/lib/utils/cn';

type ShareStatus = 'idle' | 'shared' | 'copied' | 'error';

export function ShareArticleButton({ title, summary }: { title: string; summary: string }) {
  const { locale, t } = useI18n();
  const [status, setStatus] = useState<ShareStatus>('idle');
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
        setStatus('shared');
        resetLater();
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

  const success = status === 'copied' || status === 'shared';

  return (
    <div>
      <button
        type="button"
        onClick={share}
        className={cn(
          'flex min-h-12 w-full items-center justify-center gap-2 rounded-pill border px-4 text-body font-bold transition-all duration-300 active:scale-[0.985]',
          success
            ? 'border-accent/20 bg-accent-soft text-accent shadow-inner-light'
            : 'border-line/60 bg-surface/75 text-text shadow-soft hover:-translate-y-0.5 hover:shadow-glow',
        )}
      >
        {success ? (
          <>
            <Check aria-hidden size={17} />
            {status === 'copied' ? t('article.copied') : t('article.shared')}
          </>
        ) : status === 'error' ? (
          <>
            <Copy aria-hidden size={17} />
            {locale === 'ja' ? 'もう一度共有する' : 'Try sharing again'}
          </>
        ) : (
          <>
            <Share2 aria-hidden size={17} />
            {t('article.shareTitle')}
          </>
        )}
      </button>
      {status === 'error' && (
        <p role="status" className="mt-2 text-center text-caption text-muted">
          {locale === 'ja'
            ? '共有できませんでした。ブラウザのアドレス欄からリンクをコピーしてください。'
            : 'Sharing failed. You can copy the link from your browser address bar.'}
        </p>
      )}
    </div>
  );
}
