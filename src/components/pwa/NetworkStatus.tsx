'use client';

import { useEffect, useRef, useState } from 'react';
import { CloudSun, WifiOff } from 'lucide-react';

export function NetworkStatus() {
  const [status, setStatus] = useState<'offline' | 'restored' | null>(null);
  const wasOffline = useRef(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const offline = () => {
      wasOffline.current = true;
      setStatus('offline');
    };

    const online = () => {
      if (!wasOffline.current) return;
      wasOffline.current = false;
      setStatus('restored');
      timer = setTimeout(() => setStatus(null), 2600);
    };

    if (!navigator.onLine) offline();
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
      <div className="glass flex items-center gap-2 rounded-pill border px-4 py-2.5 text-caption font-semibold text-text shadow-float">
        {status === 'offline' ? (
          <>
            <WifiOff size={15} className="text-accent" />
            オフラインです。表示済みのページを利用できます。
          </>
        ) : (
          <>
            <CloudSun size={16} className="text-accent" />
            接続が戻りました。
          </>
        )}
      </div>
    </div>
  );
}
