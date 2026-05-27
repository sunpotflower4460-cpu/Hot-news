'use client';

import { Crown } from 'lucide-react';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { PlanCard } from '@/components/premium/PlanCard';
import { Button } from '@/components/ui/Button';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { useHydrated } from '@/lib/utils/useHydrated';

export default function PremiumPage() {
  const hydrated = useHydrated();
  const isPremium = useSettingsStore((s) => s.isPremium);
  const setPremium = useSettingsStore((s) => s.setPremium);
  const premium = hydrated && isPremium;

  return (
    <div className="animate-fade-up space-y-6 pb-10">
      <ScreenHeader back />

      <div className="px-5 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Crown size={30} />
        </div>
        <h1 className="text-display font-bold text-text">プレミアム</h1>
        <p className="mx-auto mt-2 max-w-xs text-body text-muted">
          広告のない静けさの中で、すべてのやさしいお話を、あなたのペースで。
        </p>
      </div>

      <div className="space-y-3 px-5">
        <PlanCard
          highlight
          name="プレミアム"
          price="¥400"
          priceNote="/ 月"
          features={[
            '広告なしの、静かな読み心地',
            'すべての記事を読み放題',
            'お気に入りは無制限',
            '朝・夜・テーマ別の通知',
            '寝る前モード・読み返しモード',
            '週刊ほっとまとめのフルアクセス',
          ]}
        />
        <PlanCard
          name="無料"
          price="¥0"
          features={['1日数本のお話', 'お気に入り 20本まで', '基本の通知']}
        />
      </div>

      <div className="space-y-2 px-5">
        <Button
          size="lg"
          variant={premium ? 'soft' : 'primary'}
          className="w-full"
          onClick={() => setPremium(!premium)}
        >
          {premium ? 'ご利用中（解除する）' : 'プレミアムをはじめる'}
        </Button>
        <p className="text-center text-caption text-muted">
          いつでも解約できます。これは外観プレビューのため、実際の課金は発生しません。
        </p>
      </div>
    </div>
  );
}
