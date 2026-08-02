'use client';

import { Bookmark, BookOpenText, X } from 'lucide-react';
import { useI18n } from '@/lib/i18n/useI18n';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { useHydrated } from '@/lib/utils/useHydrated';

export function HomeUsageHint() {
  const hydrated = useHydrated();
  const { locale, t } = useI18n();
  const dismissed = useSettingsStore((state) => state.homeHintDismissed);
  const dismiss = useSettingsStore((state) => state.dismissHomeHint);

  if (!hydrated || dismissed) return null;

  return (
    <aside
      className="glass relative rounded-card border px-4 py-3.5 pr-12 shadow-soft"
      aria-label={locale === 'ja' ? '使い方のヒント' : 'How to use the app'}
    >
      <button
        type="button"
        aria-label={locale === 'ja' ? '使い方のヒントを閉じる' : 'Dismiss usage tip'}
        onClick={dismiss}
        className="absolute right-2.5 top-2.5 flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface/70 hover:text-text"
      >
        <X aria-hidden size={17} />
      </button>
      <p className="text-[0.7rem] font-bold tracking-[0.06em] text-accent">{t('home.hintTitle')}</p>
      <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
        <div className="flex items-start gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent shadow-inner-light">
            <BookOpenText aria-hidden size={15} />
          </span>
          <p className="text-caption leading-relaxed text-muted">
            {locale === 'ja'
              ? '記事カードを押すと、まず30秒の要点から読めます。'
              : 'Tap an article card to begin with a 30-second summary.'}
          </p>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent shadow-inner-light">
            <Bookmark aria-hidden size={15} />
          </span>
          <p className="text-caption leading-relaxed text-muted">
            {locale === 'ja'
              ? 'ブックマークで、あとから読み返せるよう保存できます。'
              : 'Use the bookmark to save a story and return to it later.'}
          </p>
        </div>
      </div>
    </aside>
  );
}
