'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSettingsStore } from '@/lib/store/useSettingsStore';

export default function EntryGate() {
  const router = useRouter();

  useEffect(() => {
    const onboarded = useSettingsStore.getState().onboarded;
    router.replace(onboarded ? '/home' : '/welcome');
  }, [router]);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-bg">
      <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-accent-soft text-3xl">
        ☀️
      </div>
      <p className="text-caption text-muted">こころの天気をととのえています…</p>
    </div>
  );
}
