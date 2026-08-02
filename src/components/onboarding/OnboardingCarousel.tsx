'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { OnboardingSlide, type Slide } from './OnboardingSlide';
import { cn } from '@/lib/utils/cn';

const SLIDES: Slide[] = [
  {
    glyph: '☀️',
    title: '明るいニュースだけを',
    body: '世界の中から、出来事そのものが明るく、希望や喜びを感じられるニュースだけを届けます。',
  },
  {
    glyph: '🔎',
    title: '暗い話を言い換えるのではなく',
    body: '悲しい前提をやわらかく見せるのではなく、最初から明るい出来事を選ぶことを大切にします。',
  },
  {
    glyph: '🫧',
    title: '出典と安全性をたしかめて',
    body: '信頼できる情報か、読む人に大きな負担がないかを確認し、内容の核を変えず短くまとめます。',
  },
  {
    glyph: '🌤️',
    title: '毎日に、小さな明るさを',
    body: '朝・昼・夕・夜。あなたのペースで、世界に実在する明るい出来事と出会えます。',
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

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <div className="safe-top flex justify-end px-5 pt-5">
        {!last && (
          <button
            type="button"
            onClick={finish}
            className="rounded-pill bg-white/25 px-3.5 py-2 text-caption font-semibold text-muted shadow-inner-light backdrop-blur-sm transition-colors hover:bg-white/40"
          >
            スキップ
          </button>
        )}
      </div>

      <div className="flex flex-1 items-center justify-center py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) next();
              else if (info.offset.x > 60 && index > 0) {
                setIndex((current) => current - 1);
              }
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

      <div className="safe-bottom flex flex-col items-center gap-4 px-7 pb-8">
        <div className="glass flex gap-2 rounded-pill border px-3 py-2 shadow-soft">
          {SLIDES.map((_, slideIndex) => (
            <button
              type="button"
              key={slideIndex}
              aria-label={`スライド ${slideIndex + 1}`}
              aria-current={slideIndex === index ? 'step' : undefined}
              onClick={() => setIndex(slideIndex)}
              className={cn(
                'h-2 rounded-pill transition-all duration-500 ease-gentle',
                slideIndex === index ? 'w-7 bg-accent shadow-glow' : 'w-2 bg-text/15',
              )}
            />
          ))}
        </div>
        {last && (
          <p className="max-w-sm text-center text-[0.7rem] leading-relaxed text-muted">
            はじめる前に
            <Link href="/legal/terms" className="mx-1 font-semibold text-accent underline underline-offset-4">
              利用規約
            </Link>
            と
            <Link href="/legal/privacy" className="mx-1 font-semibold text-accent underline underline-offset-4">
              プライバシーポリシー
            </Link>
            を確認できます。
          </p>
        )}
        <Button size="lg" className="w-full max-w-sm" onClick={next}>
          {last ? '確認して、明るいニュースをはじめる' : 'つぎへ'}
        </Button>
      </div>
    </div>
  );
}
