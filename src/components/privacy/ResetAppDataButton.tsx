'use client';

import { useEffect, useRef, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ResetAppDataButton() {
  const [armed, setArmed] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const clearData = async () => {
    if (!armed) {
      setArmed(true);
      timeoutRef.current = setTimeout(() => setArmed(false), 6000);
      return;
    }

    for (const key of Object.keys(window.localStorage)) {
      if (key.startsWith('hotnews-')) window.localStorage.removeItem(key);
    }
    window.sessionStorage.clear();

    if ('caches' in window) {
      const names = await window.caches.keys();
      await Promise.all(
        names
          .filter((name) => name.startsWith('hotnews-'))
          .map((name) => window.caches.delete(name)),
      );
    }

    window.location.replace('/welcome');
  };

  return (
    <div>
      <Button
        type="button"
        variant={armed ? 'primary' : 'outline'}
        className="w-full"
        onClick={clearData}
      >
        <Trash2 aria-hidden size={17} />
        {armed ? 'もう一度押して端末内データを削除' : '端末内データをすべて削除'}
      </Button>
      <p className="mt-2 text-center text-[0.7rem] leading-relaxed text-muted">
        保存した記事、最近読んだ履歴、表示・通知の希望、同意設定、キャッシュをこの端末から削除します。
      </p>
    </div>
  );
}
