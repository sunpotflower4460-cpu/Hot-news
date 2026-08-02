'use client';

import { Crown, Sparkles } from 'lucide-react';
import { FeatureUnavailable } from '@/components/commercial/FeatureUnavailable';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { PlanCard } from '@/components/premium/PlanCard';
import { Button } from '@/components/ui/Button';
import { commercialConfig, isCommercialPreview } from '@/config/commercial';
import { useI18n } from '@/lib/i18n/useI18n';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { useHydrated } from '@/lib/utils/useHydrated';

export default function PremiumPage() {
  const hydrated = useHydrated();
  const { locale } = useI18n();
  const isPremium = useSettingsStore((state) => state.isPremium);
  const setPremium = useSettingsStore((state) => state.setPremium);
  const previewEnabled = hydrated && isPremium;

  if (!isCommercialPreview && !commercialConfig.features.subscriptions) {
    return (
      <FeatureUnavailable
        title={locale === 'ja' ? 'プレミアムはまだ利用できません' : 'Premium is not available yet'}
        description={
          locale === 'ja'
            ? '購入、復元、解約、サーバー検証を安全に提供できるまで、この機能は公開しません。'
            : 'This feature will remain unavailable until purchase, restore, cancellation, and server verification are implemented safely.'
        }
      />
    );
  }

  const premiumFeatures =
    locale === 'ja'
      ? [
          '広告なしの、静かな読み心地',
          'すべての明るいニュースを閲覧',
          '保存した記事の端末間同期',
          '朝・夜・テーマ別の通知',
          '寝る前モードと読み返し体験',
          '週刊ライトまとめのフルアクセス',
        ]
      : [
          'A calm, ad-free reading experience',
          'Access to every published bright story',
          'Saved-story sync across devices',
          'Morning, evening, and topic notifications',
          'Bedtime mode and reading history',
          'Full weekly digest access',
        ];
  const freeFeatures =
    locale === 'ja'
      ? ['毎日の明るいニュース', '端末内の保存', '時間帯で変わる空の雰囲気']
      : [
          'Daily bright stories',
          'On-device saved stories',
          'A sky theme that changes through the day',
        ];

  return (
    <div className="space-y-7 pb-10">
      <ScreenHeader back />

      <div className="px-5 text-center">
        <div className="soft-surface relative mx-auto flex h-32 w-32 items-center justify-center rounded-[2.8rem] shadow-float">
          <div className="absolute inset-3 animate-breathe rounded-full bg-accent-soft/80 blur-xl" />
          <div className="ambient-ring relative flex h-20 w-20 animate-float items-center justify-center rounded-full bg-white/35 text-accent shadow-glow">
            <Crown aria-hidden size={34} strokeWidth={1.7} />
          </div>
        </div>
        <div className="mt-5 flex items-center justify-center gap-1.5 text-accent">
          <Sparkles aria-hidden size={13} />
          <span className="text-[0.68rem] font-bold tracking-[0.12em]">
            {isCommercialPreview ? 'FUTURE PLAN' : 'PREMIUM'}
          </span>
        </div>
        <h1 className="mt-1 text-display font-bold text-text">
          {isCommercialPreview
            ? locale === 'ja'
              ? 'プレミアム構想'
              : 'Premium concept'
            : 'Premium'}
        </h1>
        <p className="mx-auto mt-2 max-w-xs text-body leading-relaxed text-muted">
          {locale === 'ja'
            ? '明るいニュースを、広告に急かされず、自分のペースで受け取れる体験を準備しています。'
            : 'We are designing a calm way to receive bright news at your own pace, without ad pressure.'}
        </p>
      </div>

      <div className="space-y-3.5 px-5">
        <PlanCard
          highlight
          eyebrow={
            isCommercialPreview
              ? locale === 'ja'
                ? '提供予定'
                : 'Planned'
              : locale === 'ja'
                ? 'おすすめ'
                : 'Recommended'
          }
          name="Premium"
          price="¥400"
          priceNote={
            isCommercialPreview
              ? locale === 'ja'
                ? '/ 月（予定）'
                : '/ month (planned)'
              : locale === 'ja'
                ? '/ 月'
                : '/ month'
          }
          features={premiumFeatures}
        />
        <PlanCard
          eyebrow={locale === 'ja' ? '現在の基本体験' : 'Current core experience'}
          name={locale === 'ja' ? '無料' : 'Free'}
          price="¥0"
          features={freeFeatures}
        />
      </div>

      {isCommercialPreview ? (
        <div className="px-5">
          <div className="rounded-card border border-line/50 bg-surface/65 p-4 shadow-inner-light backdrop-blur-sm">
            <p className="text-caption leading-relaxed text-muted">
              {locale === 'ja'
                ? '現在は課金機能を実装していません。下のボタンは、設定画面などでプレミアム利用中の表示を確認するためのデザインプレビューです。'
                : 'Billing is not implemented. The button below only previews how a Premium state would look elsewhere in the app.'}
            </p>
          </div>
          <Button
            size="lg"
            variant={previewEnabled ? 'soft' : 'primary'}
            className="mt-3 w-full"
            onClick={() => setPremium(!previewEnabled)}
          >
            {previewEnabled
              ? locale === 'ja'
                ? 'プレミアム表示プレビューを終了'
                : 'End Premium display preview'
              : locale === 'ja'
                ? 'プレミアム表示を試す'
                : 'Preview Premium display'}
          </Button>
          <p className="mt-2 text-center text-[0.7rem] text-muted/70">
            {locale === 'ja'
              ? '実際の購入・請求・契約は発生しません。'
              : 'No purchase, charge, or contract occurs.'}
          </p>
        </div>
      ) : (
        <div className="px-5">
          <div className="rounded-card border border-line/55 bg-surface/70 px-4 py-4 text-caption leading-relaxed text-muted">
            {locale === 'ja'
              ? '購入画面はStoreKitの価格・期間・自動更新条件を取得した後に表示します。ハードコードした価格だけでは購入を開始しません。'
              : 'The purchase screen must use StoreKit-provided price, duration, and renewal terms. A hard-coded price alone never starts a purchase.'}
          </div>
        </div>
      )}
    </div>
  );
}
