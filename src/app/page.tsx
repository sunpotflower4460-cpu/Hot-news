'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingScene } from '@/components/ui/LoadingScene';
import { useSettingsStore } from '@/lib/store/useSettingsStore';

export default function EntryGate() {
  const router = useRouter();

  useEffect(() => {
    const enter = () => {
      const onboarded = useSettingsStore.getState().onboarded;
      router.replace(onboarded ? '/home' : '/welcome');
    };

    if (useSettingsStore.persist.hasHydrated()) {
      enter();
      return;
    }

    const unsubscribe = useSettingsStore.persist.onFinishHydration(enter);
    void useSettingsStore.persist.rehydrate();

    return unsubscribe;
  }, [router]);

  return <LoadingScene label="こころの天気をととのえています…" />;
}
