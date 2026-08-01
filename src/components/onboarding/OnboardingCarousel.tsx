'use client';

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
      <div className="flex justify-end px-5 pt-6">
        {!last && (
          <button onClick={finish} className="text-caption font-medium text-muted">
            スキップ
          </button>
        )}
      </div>

      <div className="flex flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) next();
              else if (info.offset.x > 60 && index > 0) {
                setIndex((current) => current - 1);
              }
            }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full cursor-grab active:cursor-grabbing"
          >
            <OnboardingSlide slide={SLIDES[index]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="safe-bottom flex flex-col items-center gap-5 px-8 pb-10">
        <div className="flex gap-2">
          {SLIDES.map((_, slideIndex) => (
            <button
              key={slideIndex}
              aria-label={`スライド ${slideIndex + 1}`}
              onClick={() => setIndex(slideIndex)}
              className={cn(
                'h-2 rounded-pill transition-all duration-300',
                slideIndex === index ? 'w-6 bg-accent' : 'w-2 bg-text/20',
              )}
            />
          ))}
        </div>
        <Button size="lg" className="w-full" onClick={next}>
          {last ? 'はじめる' : 'つぎへ'}
        </Button>
      </div>
    </div>
  );
}
