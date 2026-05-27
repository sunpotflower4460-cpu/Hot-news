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
    title: 'こころがほっとするニュース',
    body: '世界の中から、こころがほっとする出来事だけを、そっとお届けします。',
  },
  {
    glyph: '🫧',
    title: 'やさしいお話だけを、えらんで',
    body: 'AIの編集部が、信頼できる出典をたしかめ、不安をあおらない話だけを短くまとめます。',
  },
  {
    glyph: '🌤️',
    title: 'こころの天気に、寄りそって',
    body: '朝・昼・夕・夜。時間にあわせて画面の空の色が移ろい、夜はそっと目に優しくなります。',
  },
  {
    glyph: '🌙',
    title: '毎朝ひらくと、心の窓が少し開く',
    body: 'いそがなくて大丈夫。あなたのペースで、一日に小さな灯りをひとつ。',
  },
];

export function OnboardingCarousel() {
  const router = useRouter();
  const setOnboarded = useSettingsStore((s) => s.setOnboarded);
  const [index, setIndex] = useState(0);
  const last = index === SLIDES.length - 1;

  const finish = () => {
    setOnboarded(true);
    router.replace('/home');
  };

  const next = () => (last ? finish() : setIndex((i) => i + 1));

  return (
    <div className="flex min-h-full flex-1 flex-col">
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
              else if (info.offset.x > 60 && index > 0) setIndex((i) => i - 1);
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
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`スライド ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                'h-2 rounded-pill transition-all duration-300',
                i === index ? 'w-6 bg-accent' : 'w-2 bg-text/20',
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
