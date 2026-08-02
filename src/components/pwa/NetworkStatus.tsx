'use client';

import { useEffect, useRef, useState } from 'react';
import { CloudSun, WifiOff } from 'lucide-react';

const LAST_ONLINE_KEY = 'hotnews-last-online';

function formatLastOnline(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const today = new Date();
  const sameDay =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();
  const time = new Intl.DateTimeFormat('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  return sameDay ? `今日 ${time}` : `${date.getMonth() + 1}月${date.getDate()}日 ${time}`;
}

export function NetworkStatus() {
  const [status, setStatus] = useState<'offline' | 'restored' | null>(null);
  const [lastOnline, setLastOnline] = useState<string | null>(null);
  const wasOffline = useRef(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const recordOnline = () => {
      const now = new Date().toISOString();
      window.localStorage.setItem(LAST_ONLINE_KEY, now);
      setLastOnline(formatLastOnline(now));
    };

    const offline = () => {
      wasOffline.current = true;
      setLastOnline(formatLastOnline(window.localStorage.getItem(LAST_ONLINE_KEY)));
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
              <p className="font-bold">オフラインです</p>
              <p className="mt-0.5 leading-relaxed text-muted">
                表示済みのページを利用できます。
                {lastOnline ? ` 最後の接続：${lastOnline}` : ' 最後の接続時刻は確認できません。'}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 font-semibold">
            <CloudSun aria-hidden size={16} className="text-accent" />
            接続が戻りました。最新の内容を確認できます。
          </div>
        )}
      </div>
    </div>
  );
}
