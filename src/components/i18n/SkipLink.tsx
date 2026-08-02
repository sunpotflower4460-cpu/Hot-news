'use client';

import { useI18n } from '@/lib/i18n/useI18n';

export function SkipLink() {
  const { t } = useI18n();

  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-pill bg-accent-strong px-4 py-2.5 text-caption font-bold text-white shadow-glow transition-transform focus:translate-y-0"
    >
      {t('common.skipToContent')}
    </a>
  );
}
