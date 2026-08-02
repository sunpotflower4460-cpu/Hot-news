'use client';

import { Crown, Sparkles } from 'lucide-react';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { PlanCard } from '@/components/premium/PlanCard';
import { Button } from '@/components/ui/Button';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { useHydrated } from '@/lib/utils/useHydrated';

export default function PremiumPage() {
  const hydrated = useHydrated();
  const isPremium = useSettingsStore((state) => state.isPremium);
  const setPremium = useSettingsStore((state) => state.setPremium);
  const previewEnabled = hydrated && isPremium;

  return (
    <div className="space-y-7 pb-10">
      <ScreenHeader back />

      <div className="px-5 text-center">
        <div className="soft-surface relative mx-auto flex h-32 w-32 items-center justify-center rounded-[2.8rem] shadow-float">
          <div className="absolute inset-3 animate-breathe rounded-full bg-accent-soft/80 blur-xl" />
          <div className="ambient-ring relative flex h-20 w-20 animate-float items-center justify-center rounded-full bg-white/35 text-accent shadow-glow">
            <Crown size={34} strokeWidth={1.7} />
          </div>
        </div>
        <div className="mt-5 flex items-center justify-center gap-1.5 text-accent">
          <Sparkles size={13} />
          <span className="text-[0.68rem] font-bold tracking-[0.12em]">FUTURE PLAN</span>
        </div>
        <h1 className="mt-1 text-display font-bold text-text">プレミアム構想</h1>
        <p className="mx-auto mt-2 max-w-xs text-body leading-relaxed text-muted">
          明るいニュースを、広告に急かされず、自分のペースで受け取れる体験を準備しています。
        </p>
      </div>

      <div className="space-y-3.5 px-5">
        <PlanCard
          highlight
          eyebrow="提供予定"
          name="プレミアム"
          price="¥400"
          priceNote="/ 月（予定）"
          features={[
            '広告なしの、静かな読み心地',
            'すべての明るいニュースを閲覧',
            'お気に入りと端末間同期',
            '朝・夜・テーマ別の通知',
            '寝る前モードと読み返し体験',
            '週刊ライトまとめのフルアクセス',
          ]}
        />
        <PlanCard
          eyebrow="現在の基本体験"
          name="無料"
          price="¥0"
          features={['毎日の明るいニュース', '端末内のお気に入り', '時間帯で変わる心の天気']}
        />
      </div>

      <div className="px-5">
        <div className="rounded-card border border-line/50 bg-surface/65 p-4 shadow-inner-light backdrop-blur-sm">
          <p className="text-caption leading-relaxed text-muted">
            現在は課金機能を実装していません。下のボタンは、設定画面などでプレミアム利用中の表示を確認するためのデザインプレビューです。
          </p>
        </div>
        <Button
          size="lg"
          variant={previewEnabled ? 'soft' : 'primary'}
          className="mt-3 w-full"
          onClick={() => setPremium(!previewEnabled)}
        >
          {previewEnabled ? 'プレミアム表示プレビューを終了' : 'プレミアム表示を試す'}
        </Button>
        <p className="mt-2 text-center text-[0.7rem] text-muted/70">
          実際の購入・請求・契約は発生しません。
        </p>
      </div>
    </div>
  );
}
