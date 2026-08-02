'use client';

import Link from 'next/link';
import {
  Bell,
  BookOpenCheck,
  ChevronRight,
  Crown,
  FileText,
  LifeBuoy,
  Moon,
  Scale,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Card } from '@/components/ui/Card';
import { commercialConfig, isCommercialPreview } from '@/config/commercial';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { useThemeStore } from '@/lib/store/useThemeStore';
import { TIME_LABELS_JA } from '@/lib/theme/timeOfDay';
import type { TimeOfDay } from '@/lib/theme/types';
import { useHydrated } from '@/lib/utils/useHydrated';
import { cn } from '@/lib/utils/cn';

const TIMES: TimeOfDay[] = ['morning', 'day', 'evening', 'night'];

export default function SettingsPage() {
  const hydrated = useHydrated();
  const timeOverride = useThemeStore((state) => state.timeOverride);
  const setTimeOverride = useThemeStore((state) => state.setTimeOverride);
  const isPremium = useSettingsStore((state) => state.isPremium);
  const setOnboarded = useSettingsStore((state) => state.setOnboarded);
  const current = hydrated ? timeOverride : null;
  const showNotifications = isCommercialPreview || commercialConfig.features.pushNotifications;
  const showPremium = isCommercialPreview || commercialConfig.features.subscriptions;

  return (
    <div className="space-y-7 pb-10">
      <ScreenHeader title="設定" subtitle="あなたに合わせて、そっと整えます" />

      <section className="space-y-3 px-5">
        <h2 className="text-caption font-bold text-muted">見た目</h2>
        <Card inset className="space-y-5">
          <div>
            <p className="mb-2 text-body font-semibold text-text">テーマ</p>
            <ThemeToggle />
          </div>
          <div>
            <p className="mb-1 text-body font-semibold text-text">こころの天気</p>
            <p className="mb-3 text-caption text-muted">時間帯にあわせて、空の色が移ろいます。</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTimeOverride(null)}
                aria-pressed={current === null}
                className={cn(
                  'min-h-11 rounded-pill border px-3 text-caption font-semibold shadow-inner-light transition-all duration-300 ease-gentle active:scale-95',
                  current === null
                    ? 'border-transparent bg-accent-strong text-white shadow-glow'
                    : 'border-line/55 bg-surface-2/70 text-muted hover:bg-surface',
                )}
              >
                自動
              </button>
              {TIMES.map((time) => (
                <button
                  type="button"
                  key={time}
                  onClick={() => setTimeOverride(time)}
                  aria-pressed={current === time}
                  className={cn(
                    'min-h-11 rounded-pill border px-3 text-caption font-semibold shadow-inner-light transition-all duration-300 ease-gentle active:scale-95',
                    current === time
                      ? 'border-transparent bg-accent-strong text-white shadow-glow'
                      : 'border-line/55 bg-surface-2/70 text-muted hover:bg-surface',
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
        <Card className="divide-y divide-line/45">
          {showNotifications && (
            <SettingsLink
              href="/settings/notifications"
              Icon={Bell}
              label="通知"
              hint={isCommercialPreview ? '希望設定プレビュー' : '朝・夜・テーマ別'}
            />
          )}
          <SettingsLink href="/night" Icon={Moon} label="寝る前モード" hint="夜の一件だけ" />
          {showPremium && (
            <SettingsLink
              href="/premium"
              Icon={Crown}
              label={isCommercialPreview ? 'プレミアム構想' : 'プレミアム'}
              hint={
                isCommercialPreview
                  ? hydrated && isPremium
                    ? '表示プレビュー中'
                    : '機能プレビュー'
                  : 'プランを確認'
              }
            />
          )}
          <SettingsLink
            href="/welcome"
            Icon={Sparkles}
            label="最初の案内をもう一度見る"
            onClick={() => setOnboarded(false)}
          />
        </Card>
      </section>

      <section className="space-y-3 px-5">
        <h2 className="text-caption font-bold text-muted">プライバシーとサポート</h2>
        <Card className="divide-y divide-line/45">
          <SettingsLink
            href="/settings/privacy"
            Icon={ShieldCheck}
            label="プライバシー"
            hint="同意・端末内データ"
          />
          <SettingsLink
            href="/support"
            Icon={LifeBuoy}
            label="サポート"
            hint="不具合・訂正・権利"
          />
        </Card>
      </section>

      <section className="space-y-3 px-5">
        <h2 className="text-caption font-bold text-muted">方針と法的表示</h2>
        <Card className="divide-y divide-line/45">
          <SettingsLink
            href="/legal/editorial-policy"
            Icon={BookOpenCheck}
            label="編集・訂正方針"
          />
          <SettingsLink href="/legal/privacy" Icon={ShieldCheck} label="プライバシーポリシー" />
          <SettingsLink href="/legal/terms" Icon={FileText} label="利用規約" />
          <SettingsLink href="/legal/commerce" Icon={Scale} label="特定商取引法に基づく表記" />
        </Card>
      </section>

      <section className="space-y-3 px-5">
        <h2 className="text-caption font-bold text-muted">このアプリについて</h2>
        <Card inset className="relative space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-body font-semibold text-text">{commercialConfig.app.displayName}</p>
            <span className="rounded-pill bg-accent-soft/70 px-2.5 py-1 text-[0.65rem] font-bold text-accent">
              {isCommercialPreview ? 'PREVIEW' : 'PRODUCTION'}
            </span>
          </div>
          <p className="text-caption leading-relaxed text-muted">
            暗い出来事をやさしく言い換えるのではなく、出来事そのものが明るく、希望や喜びを感じられるニュースだけを選びます。
          </p>
          <p className="pt-1 text-[0.7rem] text-muted/70">
            バージョン {commercialConfig.app.version}
            {isCommercialPreview ? '（商用公開前）' : ''}
          </p>
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
  onClick,
}: {
  href: string;
  Icon: typeof Bell;
  label: string;
  hint?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex min-h-[4.5rem] items-center gap-3 px-4 py-3 transition-colors hover:bg-surface/45 active:bg-surface-2/60"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft/75 text-accent shadow-inner-light transition-transform duration-300 group-hover:scale-105">
        <Icon aria-hidden size={18} />
      </span>
      <span className="min-w-0 flex-1 text-body font-semibold text-text">{label}</span>
      {hint && <span className="max-w-[7rem] text-right text-caption leading-snug text-muted">{hint}</span>}
      <ChevronRight
        aria-hidden
        size={18}
        className="shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </Link>
  );
}
