'use client';

import { Bell, Sparkles } from 'lucide-react';
import { FeatureUnavailable } from '@/components/commercial/FeatureUnavailable';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { Card } from '@/components/ui/Card';
import { Toggle } from '@/components/ui/Toggle';
import { commercialConfig, isCommercialPreview } from '@/config/commercial';
import { localizeCategory } from '@/lib/i18n/content';
import { useI18n } from '@/lib/i18n/useI18n';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { useHydrated } from '@/lib/utils/useHydrated';
import { cn } from '@/lib/utils/cn';
import { CATEGORIES } from '@/mock/categories';

export default function NotificationsPage() {
  const hydrated = useHydrated();
  const { locale } = useI18n();
  const morningNotify = useSettingsStore((state) => state.morningNotify);
  const nightNotify = useSettingsStore((state) => state.nightNotify);
  const weeklyDigest = useSettingsStore((state) => state.weeklyDigest);
  const topicNotify = useSettingsStore((state) => state.topicNotify);
  const setMorningNotify = useSettingsStore((state) => state.setMorningNotify);
  const setNightNotify = useSettingsStore((state) => state.setNightNotify);
  const setWeeklyDigest = useSettingsStore((state) => state.setWeeklyDigest);
  const toggleTopic = useSettingsStore((state) => state.toggleTopic);

  if (!isCommercialPreview && !commercialConfig.features.pushNotifications) {
    return (
      <FeatureUnavailable
        title={locale === 'ja' ? '通知はまだ利用できません' : 'Notifications are not available yet'}
        description={
          locale === 'ja'
            ? '許可、配信停止、タイムゾーン、撤回記事の停止まで安全に提供できる状態になってから公開します。'
            : 'Notifications will be released only after permission, opt-out, time-zone handling, and retracted-story cancellation work safely.'
        }
      />
    );
  }

  return (
    <div className="space-y-7 pb-10">
      <ScreenHeader
        title={locale === 'ja' ? '通知' : 'Notifications'}
        subtitle={
          locale === 'ja' ? '届けかたは、あなたのペースで' : 'Choose a pace that works for you'
        }
        back
      />

      {isCommercialPreview && (
        <div className="px-5">
          <div className="relative overflow-hidden rounded-card border border-accent/10 bg-accent-soft/55 px-4 py-4 shadow-inner-light">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/35 blur-2xl" />
            <div className="relative flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/40 text-accent shadow-glow">
                <Bell aria-hidden size={18} />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-body font-bold text-text">
                    {locale === 'ja'
                      ? '通知の希望を保存できます'
                      : 'You can save notification preferences'}
                  </p>
                  <span className="rounded-pill bg-surface/65 px-2 py-0.5 text-[0.65rem] font-bold text-accent">
                    PREVIEW
                  </span>
                </div>
                <p className="mt-1 text-caption leading-relaxed text-muted">
                  {locale === 'ja'
                    ? '現在は設定のプレビューです。通知機能の提供開始後に、この好みを利用します。'
                    : 'This is a settings preview. These choices may be used after notification delivery is implemented.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="space-y-3 px-5">
        <div className="flex items-center gap-2">
          <Sparkles aria-hidden size={14} className="text-accent" />
          <h2 className="text-caption font-bold text-muted">
            {locale === 'ja' ? '届くタイミング' : 'Delivery timing'}
          </h2>
        </div>
        <Card className="divide-y divide-line/45">
          <Row
            label={locale === 'ja' ? '朝のごあいさつ' : 'Morning greeting'}
            hint={
              locale === 'ja'
                ? '6:00ごろ、今日の明るいニュース3本'
                : "Around 6:00, today's three bright stories"
            }
          >
            <Toggle
              checked={hydrated && morningNotify}
              onChange={setMorningNotify}
              label={locale === 'ja' ? '朝のごあいさつ' : 'Morning greeting'}
            />
          </Row>
          <Row
            label={locale === 'ja' ? '夜の短いニュース' : 'Short evening story'}
            hint={
              locale === 'ja' ? '22:00ごろ、寝る前にひとつ' : 'Around 22:00, one story before bed'
            }
          >
            <Toggle
              checked={hydrated && nightNotify}
              onChange={setNightNotify}
              label={locale === 'ja' ? '夜の短いニュース' : 'Short evening story'}
            />
          </Row>
          <Row
            label={locale === 'ja' ? '週刊ライトまとめ' : 'Weekly bright digest'}
            hint={
              locale === 'ja' ? '日曜の朝に、一週間ぶん' : 'A one-week collection on Sunday morning'
            }
          >
            <Toggle
              checked={hydrated && weeklyDigest}
              onChange={setWeeklyDigest}
              label={locale === 'ja' ? '週刊ライトまとめ' : 'Weekly bright digest'}
            />
          </Row>
        </Card>
      </section>

      <section className="space-y-3 px-5">
        <h2 className="text-caption font-bold text-muted">
          {locale === 'ja' ? 'テーマ別のお知らせ' : 'Topic notifications'}
        </h2>
        <p className="-mt-1 text-caption text-muted">
          {locale === 'ja'
            ? '気になるテーマだけ、そっと選べます。'
            : 'Choose only the topics you care about.'}
        </p>
        <div className="flex flex-wrap gap-2.5">
          {CATEGORIES.map((rawCategory) => {
            const category = localizeCategory(rawCategory, locale);
            const active = hydrated && topicNotify.includes(category.id);
            return (
              <button
                type="button"
                key={category.id}
                onClick={() => toggleTopic(category.id)}
                aria-pressed={active}
                className={cn(
                  'min-h-11 rounded-pill border px-4 py-2 text-caption font-semibold shadow-inner-light transition-all duration-300 ease-gentle active:scale-95',
                  active
                    ? 'border-transparent text-white shadow-glow'
                    : 'border-line/60 bg-surface/72 text-muted hover:-translate-y-0.5 hover:border-accent/20',
                )}
                style={active ? { backgroundColor: `hsl(${category.accent})` } : undefined}
              >
                {category.glyph} {category.labelJa}
              </button>
            );
          })}
        </div>
      </section>

      {!isCommercialPreview && (
        <p className="px-5 text-center text-[0.68rem] leading-relaxed text-muted/75">
          {locale === 'ja'
            ? 'OSの通知許可は、通知を初めて有効にする操作の直前に確認します。設定をオフにした場合は配信対象から外します。'
            : 'The OS notification permission is requested only when you first choose to enable delivery. Turning a setting off removes it from delivery.'}
        </p>
      )}
    </div>
  );
}

function Row({
  label,
  hint,
  children,
}: {
  label: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[4.75rem] items-center gap-3 px-4 py-3">
      <div className="flex-1">
        <p className="text-body font-semibold text-text">{label}</p>
        <p className="mt-0.5 text-caption text-muted">{hint}</p>
      </div>
      {children}
    </div>
  );
}
