'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n/useI18n';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { OnboardingSlide, type Slide } from './OnboardingSlide';
import { cn } from '@/lib/utils/cn';

export function OnboardingCarousel() {
  const router = useRouter();
  const { locale, t } = useI18n();
  const setOnboarded = useSettingsStore((state) => state.setOnboarded);
  const [index, setIndex] = useState(0);
  const slides: Slide[] = [
    {
      glyph: '☀️',
      title: t('onboarding.firstTitle'),
      body: t('onboarding.firstBody'),
    },
    {
      glyph: '🫧',
      title: t('onboarding.secondTitle'),
      body: t('onboarding.secondBody'),
    },
  ];
  const last = index === slides.length - 1;

  const finish = () => {
    setOnboarded(true);
    router.replace('/home');
  };

  const next = () => (last ? finish() : setIndex((current) => current + 1));
  const previous = () => setIndex((current) => Math.max(0, current - 1));

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <div className="safe-top flex items-center justify-between gap-3 px-5">
        <p className="text-caption font-bold text-muted" aria-live="polite">
          {index + 1} / {slides.length}
        </p>
        <div className="flex items-center gap-2">
          <LanguageSwitcher compact />
          {!last && (
            <button
              type="button"
              onClick={finish}
              className="min-h-11 rounded-pill bg-white/25 px-3.5 text-caption font-semibold text-muted shadow-inner-light backdrop-blur-sm transition-colors hover:bg-white/40"
            >
              {t('onboarding.later')}
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center py-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${locale}-${index}`}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) next();
              else if (info.offset.x > 60 && index > 0) previous();
            }}
            initial={{ opacity: 0, x: 34, scale: 0.985 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -34, scale: 0.985 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="w-full cursor-grab touch-pan-y active:cursor-grabbing"
          >
            <OnboardingSlide slide={slides[index]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-3 px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        <div
          className="glass flex items-center rounded-pill border px-1.5 py-1 shadow-soft"
          aria-label={locale === 'ja' ? '案内ページ' : 'Introduction pages'}
        >
          {slides.map((slide, slideIndex) => (
            <button
              type="button"
              key={slide.title}
              aria-label={
                locale === 'ja'
                  ? `${slideIndex + 1}ページ目、${slide.title}`
                  : `Page ${slideIndex + 1}, ${slide.title}`
              }
              aria-current={slideIndex === index ? 'step' : undefined}
              onClick={() => setIndex(slideIndex)}
              className="flex h-10 w-10 items-center justify-center rounded-full"
            >
              <span
                aria-hidden
                className={cn(
                  'h-2 rounded-pill transition-all duration-500 ease-gentle',
                  slideIndex === index ? 'w-6 bg-accent shadow-glow' : 'w-2 bg-text/18',
                )}
              />
            </button>
          ))}
        </div>

        {last && (
          <p className="max-w-sm text-center text-[0.72rem] leading-relaxed text-muted">
            {t('onboarding.before')}
            <Link
              href="/legal/terms"
              className="mx-1 font-semibold text-accent underline underline-offset-4"
            >
              {t('settings.terms')}
            </Link>
            {t('onboarding.and')}
            <Link
              href="/legal/privacy"
              className="mx-1 font-semibold text-accent underline underline-offset-4"
            >
              {t('settings.privacyPolicy')}
            </Link>
            {locale === 'ja' ? 'を確認できます。' : '.'}
          </p>
        )}

        <div className="flex w-full max-w-sm gap-2.5">
          {index > 0 ? (
            <Button variant="outline" size="lg" className="w-[7.5rem] px-4" onClick={previous}>
              <ChevronLeft aria-hidden size={18} />
              {t('onboarding.previous')}
            </Button>
          ) : (
            <span aria-hidden className="w-[7.5rem]" />
          )}
          <Button size="lg" className="min-w-0 flex-1 px-4" onClick={next}>
            {last ? t('onboarding.start') : t('onboarding.next')}
            <ChevronRight aria-hidden size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
