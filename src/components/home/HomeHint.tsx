'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { BookOpenText, Heart, Moon, X } from 'lucide-react';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { useHydrated } from '@/lib/utils/useHydrated';

const TIPS = [
  { Icon: Heart, text: '気になったお話は、ハートで保存' },
  { Icon: BookOpenText, text: '下のタブで、さがす・まとめへ' },
  { Icon: Moon, text: '夜は寝る前モードでひとつだけ' },
];

export function HomeHint() {
  const hydrated = useHydrated();
  const dismissed = useSettingsStore((s) => s.homeHintDismissed);
  const dismiss = useSettingsStore((s) => s.dismissHomeHint);

  const show = hydrated && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden px-5"
        >
          <div className="relative rounded-card border border-line/60 bg-surface/80 p-4 shadow-soft backdrop-blur">
            <button
              onClick={dismiss}
              aria-label="ヒントをとじる"
              className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2"
            >
              <X size={18} />
            </button>
            <p className="mb-3 pr-8 text-body font-bold text-text">はじめての方へ</p>
            <ul className="space-y-2.5">
              {TIPS.map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-body text-text/90">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Icon size={16} />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
