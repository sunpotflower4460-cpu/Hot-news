'use client';

import Link from 'next/link';
import { Bell, ChevronRight, Crown, Moon } from 'lucide-react';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Card } from '@/components/ui/Card';
import { useThemeStore } from '@/lib/store/useThemeStore';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { useHydrated } from '@/lib/utils/useHydrated';
import { TIME_LABELS_JA } from '@/lib/theme/timeOfDay';
import type { TimeOfDay } from '@/lib/theme/types';
import { cn } from '@/lib/utils/cn';

const TIMES: TimeOfDay[] = ['morning', 'day', 'evening', 'night'];

export default function SettingsPage() {
  const hydrated = useHydrated();
  const timeOverride = useThemeStore((state) => state.timeOverride);
  const setTimeOverride = useThemeStore((state) => state.setTimeOverride);
  const isPremium = useSettingsStore((state) => state.isPremium);
  const current = hydrated ? timeOverride : null;

  return (
    <div className="space-y-6 pb-8">
      <ScreenHeader title="設定" subtitle="あなたに合わせて、そっと整えます" />

      <section className="space-y-3 px-5">
        <h2 className="text-caption font-bold text-muted">見た目</h2>
        <Card inset className="space-y-4">
          <div>
            <p className="mb-2 text-body font-medium text-text">テーマ</p>
            <ThemeToggle />
          </div>
          <div>
            <p className="mb-1 text-body font-medium text-text">こころの天気</p>
            <p className="mb-2 text-caption text-muted">時間帯にあわせて、空の色が移ろいます。</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setTimeOverride(null)}
                aria-pressed={current === null}
                className={cn(
                  'rounded-pill px-3.5 py-1.5 text-caption font-medium transition-colors',
                  current === null ? 'bg-accent text-white' : 'bg-surface-2 text-muted',
                )}
              >
                自動
              </button>
              {TIMES.map((time) => (
                <button
                  key={time}
                  onClick={() => setTimeOverride(time)}
                  aria-pressed={current === time}
                  className={cn(
                    'rounded-pill px-3.5 py-1.5 text-caption font-medium transition-colors',
                    current === time ? 'bg-accent text-white' : 'bg-surface-2 text-muted',
                  )}
                >
                  {TIME_LABELS_JA[time]}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-3 px-5">
        <h2 className="text-caption font-bold text-muted">体験</h2>
        <Card className="divide-y divide-line/60">
          <SettingsLink
            href="/settings/notifications"
            Icon={Bell}
            label="通知"
            hint="朝・夜・テーマ別"
          />
          <SettingsLink href="/night" Icon={Moon} label="寝る前モード" hint="夜の一件だけ" />
          <SettingsLink
            href="/premium"
            Icon={Crown}
            label="プレミアム"
            hint={hydrated && isPremium ? 'プレビュー利用中' : '機能プレビュー'}
          />
        </Card>
      </section>

      <section className="space-y-3 px-5">
        <h2 className="text-caption font-bold text-muted">このアプリについて</h2>
        <Card inset className="space-y-1">
          <p className="text-body text-text">明るいニュース｜Hot News</p>
          <p className="text-caption text-muted">
            暗い出来事をやさしく言い換えるのではなく、出来事そのものが明るく、希望や喜びを感じられるニュースだけを選びます。
          </p>
          <p className="pt-1 text-[0.7rem] text-muted/70">バージョン 0.1.0（外観プレビュー）</p>
        </Card>
      </section>
    </div>
  );
}

function SettingsLink({
  href,
  Icon,
  label,
  hint,
}: {
  href: string;
  Icon: typeof Bell;
  label: string;
  hint?: string;
}) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
        <Icon size={18} />
      </span>
      <span className="flex-1 text-body font-medium text-text">{label}</span>
      {hint && <span className="text-caption text-muted">{hint}</span>}
      <ChevronRight size={18} className="text-muted" />
    </Link>
  );
}
