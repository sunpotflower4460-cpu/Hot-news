'use client';

import Link from 'next/link';
import {
  BarChart3,
  Bug,
  ChevronRight,
  Clock3,
  Database,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { ResetAppDataButton } from '@/components/privacy/ResetAppDataButton';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { Card } from '@/components/ui/Card';
import { commercialConfig } from '@/config/commercial';
import { usePrivacyStore, type ConsentChoice } from '@/lib/store/usePrivacyStore';
import { useHydrated } from '@/lib/utils/useHydrated';
import { cn } from '@/lib/utils/cn';

export default function PrivacyChoicesPage() {
  const hydrated = useHydrated();
  const analytics = usePrivacyStore((state) => state.analytics);
  const diagnostics = usePrivacyStore((state) => state.diagnostics);
  const updatedAt = usePrivacyStore((state) => state.updatedAt);
  const setAnalytics = usePrivacyStore((state) => state.setAnalytics);
  const setDiagnostics = usePrivacyStore((state) => state.setDiagnostics);
  const resetConsent = usePrivacyStore((state) => state.resetConsent);

  return (
    <div className="space-y-7 pb-10">
      <ScreenHeader title="プライバシー" subtitle="送る情報は、あなたが選べます" back />

      <section className="px-5">
        <div className="soft-surface relative overflow-hidden rounded-panel px-5 py-5 shadow-soft">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-soft/70 blur-3xl" />
          <div className="relative flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent shadow-inner-light">
              <ShieldCheck aria-hidden size={21} />
            </span>
            <div>
              <h1 className="text-h2 font-bold text-text">
                現在、利用データは外部送信していません
              </h1>
              <p className="mt-1 text-caption leading-relaxed text-muted">
                保存した記事、最近読んだ履歴、表示設定はこの端末だけに保存されます。分析・診断機能を追加する場合も、方針を更新し、必要な同意を改めて確認します。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3 px-5">
        <h2 className="text-caption font-bold text-muted">この端末に保存されるもの</h2>
        <Card inset className="space-y-4">
          <DataLine Icon={Smartphone} label="表示設定・通知の希望" value="端末内のみ" />
          <DataLine Icon={Database} label="保存した記事・同意履歴" value="端末内のみ" />
          <DataLine Icon={Clock3} label="最近読んだ記事" value="最大50件・30日" />
          <p className="border-t border-line/45 pt-3 text-caption leading-relaxed text-muted">
            最近読んだ履歴は、保存し忘れた記事へ戻れるように保持します。30日を過ぎたものは自動で整理され、端末内データの削除からいつでも消せます。
          </p>
          <p className="text-caption leading-relaxed text-muted">
            アカウント、氏名、メールアドレス、位置情報、広告識別子は現在収集していません。
          </p>
        </Card>
      </section>

      <section className="space-y-3 px-5">
        <div>
          <h2 className="text-caption font-bold text-muted">将来の任意データ送信</h2>
          <p className="mt-1 text-caption leading-relaxed text-muted">
            現在はどちらも未実装です。ここでは希望だけを端末内に保存します。
          </p>
        </div>
        <Card className="divide-y divide-line/45">
          <ConsentRow
            Icon={BarChart3}
            title="匿名の利用状況"
            description="画面の利用回数など、製品改善に必要な最小限の集計情報。記事本文、URL、検索語、個人情報は送信対象にしません。"
            active={commercialConfig.features.analytics}
            choice={hydrated ? analytics : 'denied'}
            onChange={setAnalytics}
          />
          <ConsentRow
            Icon={Bug}
            title="匿名の不具合診断"
            description="クラッシュ種類やアプリバージョンなど。本文、閲覧履歴、入力内容、連絡先は送信対象にしません。"
            active={commercialConfig.features.diagnostics}
            choice={hydrated ? diagnostics : 'denied'}
            onChange={setDiagnostics}
          />
        </Card>
        {hydrated && updatedAt && (
          <p className="text-right text-[0.68rem] text-muted/75">
            最終更新：{new Date(updatedAt).toLocaleString('ja-JP')}
          </p>
        )}
        <button
          type="button"
          onClick={resetConsent}
          className="min-h-11 w-full rounded-pill text-caption font-semibold text-accent transition-colors hover:bg-accent-soft/55"
        >
          同意設定を初期状態に戻す
        </button>
      </section>

      <section className="space-y-3 px-5">
        <h2 className="text-caption font-bold text-muted">端末内データの管理</h2>
        <Card inset>
          <ResetAppDataButton />
        </Card>
      </section>

      <section className="px-5">
        <Link
          href="/legal/privacy"
          className="group flex min-h-14 items-center gap-3 rounded-card border border-line/55 bg-surface/70 px-4 shadow-inner-light"
        >
          <ShieldCheck aria-hidden size={18} className="text-accent" />
          <span className="flex-1 text-body font-semibold text-text">
            プライバシーポリシーを読む
          </span>
          <ChevronRight
            aria-hidden
            size={17}
            className="text-muted transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </section>
    </div>
  );
}

function DataLine({
  Icon,
  label,
  value,
}: {
  Icon: typeof Smartphone;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft/70 text-accent">
        <Icon aria-hidden size={17} />
      </span>
      <span className="flex-1 text-body font-medium text-text">{label}</span>
      <span className="rounded-pill bg-surface-2 px-2.5 py-1 text-[0.68rem] font-semibold text-muted">
        {value}
      </span>
    </div>
  );
}

function ConsentRow({
  Icon,
  title,
  description,
  active,
  choice,
  onChange,
}: {
  Icon: typeof BarChart3;
  title: string;
  description: string;
  active: boolean;
  choice: ConsentChoice;
  onChange: (choice: ConsentChoice) => void;
}) {
  return (
    <div className="space-y-3 px-4 py-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft/70 text-accent">
          <Icon aria-hidden size={17} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-body font-semibold text-text">{title}</p>
            <span className="rounded-pill bg-surface-2 px-2 py-0.5 text-[0.64rem] font-bold text-muted">
              {active ? '提供中' : '未実装'}
            </span>
          </div>
          <p className="mt-1 text-caption leading-relaxed text-muted">{description}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 pl-12">
        {(['denied', 'allowed'] as ConsentChoice[]).map((value) => (
          <button
            type="button"
            key={value}
            aria-pressed={choice === value}
            onClick={() => onChange(value)}
            className={cn(
              'min-h-11 rounded-pill border px-3 text-caption font-semibold transition-all active:scale-95',
              choice === value
                ? 'border-transparent bg-accent-strong text-white shadow-glow'
                : 'border-line/60 bg-surface text-muted',
            )}
          >
            {value === 'allowed' ? '許可する' : '送信しない'}
          </button>
        ))}
      </div>
    </div>
  );
}
