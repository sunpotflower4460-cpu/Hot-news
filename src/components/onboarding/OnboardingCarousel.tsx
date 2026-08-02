'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { OnboardingSlide, type Slide } from './OnboardingSlide';
import { cn } from '@/lib/utils/cn';

const SLIDES: Slide[] = [
  {
    glyph: '☀️',
    title: '明るい出来事だけを、1日3件',
    body: '暗いニュースをやさしく言い換えるのではなく、出来事そのものが明るく、希望を感じられるニュースを選びます。',
  },
  {
    glyph: '🫧',
    title: '短く読めて、出典も確認できます',
    body: 'まず30秒の要点から。AIが補助した場合や、人が確認した内容も表示します。通知はあとから自由に選べます。',
  },
];

export function OnboardingCarousel() {
  const router = useRouter();
  const setOnboarded = useSettingsStore((state) => state.setOnboarded);
  const [index, setIndex] = useState(0);
  const last = index === SLIDES.length - 1;

  const finish = () => {
    setOnboarded(true);
    router.replace('/home');
  };

  const next = () => (last ? finish() : setIndex((current) => current + 1));
  const previous = () => setIndex((current) => Math.max(0, current - 1));

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <div className="safe-top flex items-center justify-between px-5">
        <p className="text-caption font-bold text-muted" aria-live="polite">
          {index + 1} / {SLIDES.length}
        </p>
        {!last && (
          <button
            type="button"
            onClick={finish}
            className="min-h-11 rounded-pill bg-white/25 px-3.5 text-caption font-semibold text-muted shadow-inner-light backdrop-blur-sm transition-colors hover:bg-white/40"
          >
            あとで見る
          </button>
        )}
      </div>

      <div className="flex flex-1 items-center justify-center py-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
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
            <OnboardingSlide slide={SLIDES[index]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-3 px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        <div
          className="glass flex items-center rounded-pill border px-1.5 py-1 shadow-soft"
          aria-label="案内ページ"
        >
          {SLIDES.map((slide, slideIndex) => (
            <button
              type="button"
              key={slide.title}
              aria-label={`${slideIndex + 1}ページ目、${slide.title}`}
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
            はじめる前に
            <Link
              href="/legal/terms"
              className="mx-1 font-semibold text-accent underline underline-offset-4"
            >
              利用規約
            </Link>
            と
            <Link
              href="/legal/privacy"
              className="mx-1 font-semibold text-accent underline underline-offset-4"
            >
              プライバシーポリシー
            </Link>
            を確認できます。
          </p>
        )}

        <div className="flex w-full max-w-sm gap-2.5">
          {index > 0 ? (
            <Button variant="outline" size="lg" className="w-[7.5rem] px-4" onClick={previous}>
              <ChevronLeft aria-hidden size={18} />
              戻る
            </Button>
          ) : (
            <span aria-hidden className="w-[7.5rem]" />
          )}
          <Button size="lg" className="min-w-0 flex-1 px-4" onClick={next}>
            {last ? '明るいニュースをはじめる' : '次へ'}
            <ChevronRight aria-hidden size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
