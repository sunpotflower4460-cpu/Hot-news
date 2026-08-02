'use client';

import { useEffect, useRef, useState } from 'react';
import { CloudSun, WifiOff } from 'lucide-react';
import type { Locale } from '@/lib/i18n/messages';
import { useI18n } from '@/lib/i18n/useI18n';

const LAST_ONLINE_KEY = 'hotnews-last-online';

function formatLastOnline(value: string | null, locale: Locale) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const today = new Date();
  const sameDay =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();
  const time = new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  if (sameDay) return locale === 'ja' ? `今日 ${time}` : `Today ${time}`;
  const day = new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
  return `${day} ${time}`;
}

export function NetworkStatus() {
  const { locale, t } = useI18n();
  const [status, setStatus] = useState<'offline' | 'restored' | null>(null);
  const [lastOnlineRaw, setLastOnlineRaw] = useState<string | null>(null);
  const wasOffline = useRef(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const recordOnline = () => {
      const now = new Date().toISOString();
      window.localStorage.setItem(LAST_ONLINE_KEY, now);
      setLastOnlineRaw(now);
    };

    const offline = () => {
      wasOffline.current = true;
      setLastOnlineRaw(window.localStorage.getItem(LAST_ONLINE_KEY));
      setStatus('offline');
    };

    const online = () => {
      recordOnline();
      if (!wasOffline.current) return;
      wasOffline.current = false;
      setStatus('restored');
      timer = setTimeout(() => setStatus(null), 2600);
    };

    if (navigator.onLine) recordOnline();
    else offline();
    window.addEventListener('offline', offline);
    window.addEventListener('online', online);

    return () => {
      window.removeEventListener('offline', offline);
      window.removeEventListener('online', online);
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!status) return null;

  const lastOnline = formatLastOnline(lastOnlineRaw, locale);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none absolute inset-x-0 bottom-[6.1rem] z-40 flex justify-center px-5"
    >
      <div className="glass max-w-sm rounded-card border px-4 py-3 text-caption text-text shadow-float">
        {status === 'offline' ? (
          <div className="flex items-start gap-2.5">
            <WifiOff aria-hidden size={16} className="mt-0.5 shrink-0 text-accent" />
            <div>
              <p className="font-bold">{locale === 'ja' ? 'オフラインです' : 'You are offline'}</p>
              <p className="mt-0.5 leading-relaxed text-muted">
                {t('network.offline')}
                {lastOnline
                  ? ` ${t('network.lastConnected')}: ${lastOnline}`
                  : locale === 'ja'
                    ? ' 最後の接続時刻は確認できません。'
                    : ' The last connection time is unavailable.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 font-semibold">
            <CloudSun aria-hidden size={16} className="text-accent" />
            {locale === 'ja'
              ? '接続が戻りました。最新の内容を確認できます。'
              : 'Connection restored. You can check the latest content.'}
          </div>
        )}
      </div>
    </div>
  );
}
