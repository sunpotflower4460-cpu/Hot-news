'use client';

import { useEffect, useRef, useState } from 'react';
import { AlertCircle, Check, ClipboardCopy } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { commercialConfig } from '@/config/commercial';
import { useI18n } from '@/lib/i18n/useI18n';

type CopyState = 'idle' | 'copied' | 'failed';

const legacyCopy = (text: string) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand('copy');
  } finally {
    textarea.remove();
  }
};

export function DiagnosticCopyButton() {
  const { locale } = useI18n();
  const [state, setState] = useState<CopyState>('idle');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const copy = async () => {
    const details = [
      `App: ${commercialConfig.app.displayName}`,
      `Version: ${commercialConfig.app.version}`,
      `Stage: ${commercialConfig.releaseStage}`,
      `Page: ${window.location.pathname}`,
      `Online: ${navigator.onLine ? 'yes' : 'no'}`,
      `App locale: ${locale}`,
      `Device language: ${navigator.language}`,
      `User agent: ${navigator.userAgent}`,
      `Time: ${new Date().toISOString()}`,
    ].join('\n');

    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(details);
      } else if (!legacyCopy(details)) {
        throw new Error('Clipboard copy is unavailable');
      }
      setState('copied');
    } catch {
      setState('failed');
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setState('idle'), 3500);
  };

  const Icon = state === 'copied' ? Check : state === 'failed' ? AlertCircle : ClipboardCopy;
  const label =
    state === 'copied'
      ? locale === 'ja'
        ? '診断情報をコピーしました'
        : 'Diagnostic information copied'
      : state === 'failed'
        ? locale === 'ja'
          ? 'コピーできませんでした'
          : 'Could not copy diagnostic information'
        : locale === 'ja'
          ? '問い合わせ用の診断情報をコピー'
          : 'Copy diagnostic information for support';

  return (
    <div>
      <Button type="button" variant="outline" className="w-full" onClick={copy}>
        <Icon aria-hidden size={17} />
        {label}
      </Button>
      {state === 'failed' && (
        <p role="status" className="mt-2 text-center text-[0.68rem] leading-relaxed text-muted">
          {locale === 'ja'
            ? 'ブラウザの権限や安全な接続を確認して、もう一度お試しください。'
            : 'Check the browser permission and secure connection, then try again.'}
        </p>
      )}
    </div>
  );
}
