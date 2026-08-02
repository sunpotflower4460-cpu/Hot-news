'use client';

import Link from 'next/link';
import {
  Accessibility,
  Bell,
  BookOpenCheck,
  ChevronRight,
  Crown,
  FileText,
  Languages,
  LifeBuoy,
  Moon,
  Scale,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Card } from '@/components/ui/Card';
import { commercialConfig, isCommercialPreview } from '@/config/commercial';
import type { TranslationKey } from '@/lib/i18n/messages';
import { useI18n } from '@/lib/i18n/useI18n';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { useThemeStore } from '@/lib/store/useThemeStore';
import type { TimeOfDay } from '@/lib/theme/types';
import { useHydrated } from '@/lib/utils/useHydrated';
import { cn } from '@/lib/utils/cn';

const TIMES: { value: TimeOfDay; labelKey: TranslationKey }[] = [
  { value: 'morning', labelKey: 'time.morning' },
  { value: 'day', labelKey: 'time.day' },
  { value: 'evening', labelKey: 'time.evening' },
  { value: 'night', labelKey: 'time.night' },
];

export default function SettingsPage() {
  const hydrated = useHydrated();
  const { locale, t } = useI18n();
  const timeOverride = useThemeStore((state) => state.timeOverride);
  const setTimeOverride = useThemeStore((state) => state.setTimeOverride);
  const isPremium = useSettingsStore((state) => state.isPremium);
  const setOnboarded = useSettingsStore((state) => state.setOnboarded);
  const current = hydrated ? timeOverride : null;
  const showNotifications = isCommercialPreview || commercialConfig.features.pushNotifications;
  const showPremium = isCommercialPreview || commercialConfig.features.subscriptions;

  return (
    <div className="space-y-7 pb-10">
      <ScreenHeader title={t('settings.title')} subtitle={t('settings.subtitle')} showLanguage={false} />

      <section className="space-y-3 px-5">
        <SectionLabel title={t('settings.display')} description={t('settings.displayBody')} />
        <Card inset className="space-y-5">
          <div>
            <div className="flex items-center gap-2">
              <Languages aria-hidden size={17} className="text-accent" />
              <p className="text-body font-semibold text-text">{t('settings.language')}</p>
            </div>
            <p className="mb-2 mt-0.5 text-caption text-muted">{t('settings.languageBody')}</p>
            <LanguageSwitcher className="w-full justify-center" />
          </div>

          <div className="border-t border-line/45 pt-5">
            <p className="text-body font-semibold text-text">{t('settings.appearance')}</p>
            <p className="mb-2 mt-0.5 text-caption text-muted">{t('settings.appearanceBody')}</p>
            <ThemeToggle />
          </div>

          <div className="border-t border-line/45 pt-5">
            <p className="text-body font-semibold text-text">{t('settings.sky')}</p>
            <p className="mb-3 mt-0.5 text-caption text-muted">{t('settings.skyBody')}</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTimeOverride(null)}
                aria-pressed={current === null}
                className={cn(
                  'col-span-2 min-h-12 rounded-pill border px-3 text-caption font-semibold shadow-inner-light transition-all duration-300 ease-gentle active:scale-[0.98]',
                  current === null
                    ? 'border-transparent bg-accent-strong text-white shadow-glow'
                    : 'border-line/55 bg-surface-2/70 text-muted hover:bg-surface',
                )}
              >
                {t('settings.autoTime')}
              </button>
              {TIMES.map(({ value, labelKey }) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => setTimeOverride(value)}
                  aria-pressed={current === value}
                  className={cn(
                    'min-h-12 rounded-pill border px-3 text-caption font-semibold shadow-inner-light transition-all duration-300 ease-gentle active:scale-[0.98]',
                    current === value
                      ? 'border-transparent bg-accent-strong text-white shadow-glow'
                      : 'border-line/55 bg-surface-2/70 text-muted hover:bg-surface',
                  )}
                >
                  {t(labelKey)}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-3 px-5">
        <SectionLabel title={t('settings.usage')} description={t('settings.usageBody')} />
        <Card className="divide-y divide-line/45">
          {showNotifications && (
            <SettingsLink
              href="/settings/notifications"
              Icon={Bell}
              label={t('settings.notifications')}
              hint={
                isCommercialPreview
                  ? t('settings.notificationPreview')
                  : locale === 'ja'
                    ? '朝・夜・テーマ別'
                    : 'Morning, evening, and topic choices'
              }
            />
          )}
          <SettingsLink
            href="/night"
            Icon={Moon}
            label={t('settings.night')}
            hint={t('settings.nightBody')}
          />
          {showPremium && (
            <SettingsLink
              href="/premium"
              Icon={Crown}
              label={
                isCommercialPreview
                  ? locale === 'ja'
                    ? 'プレミアム機能の構想'
                    : 'Premium feature preview'
                  : 'Premium'
              }
              hint={
                isCommercialPreview
                  ? hydrated && isPremium
                    ? locale === 'ja'
                      ? '表示プレビュー中'
                      : 'Display preview enabled'
                    : locale === 'ja'
                      ? '料金は発生しません'
                      : 'No payment is made'
                  : locale === 'ja'
                    ? 'プランを確認'
                    : 'View plans'
              }
            />
          )}
          <SettingsLink
            href="/welcome"
            Icon={Sparkles}
            label={t('settings.onboarding')}
            hint={t('settings.onboardingBody')}
            onClick={() => setOnboarded(false)}
          />
        </Card>
      </section>

      <section className="space-y-3 px-5">
        <SectionLabel title={t('settings.safety')} description={t('settings.safetyBody')} />
        <Card className="divide-y divide-line/45">
          <SettingsLink
            href="/settings/privacy"
            Icon={ShieldCheck}
            label={t('settings.privacy')}
            hint={t('settings.privacyBody')}
          />
          <SettingsLink
            href="/support"
            Icon={LifeBuoy}
            label={t('settings.support')}
            hint={t('settings.supportBody')}
          />
        </Card>
      </section>

      <section className="space-y-3 px-5">
        <SectionLabel title={t('settings.policies')} description={t('settings.policiesBody')} />
        <Card className="divide-y divide-line/45">
          <SettingsLink
            href="/legal/editorial-policy"
            Icon={BookOpenCheck}
            label={t('settings.editorial')}
          />
          <SettingsLink
            href="/legal/accessibility"
            Icon={Accessibility}
            label={t('settings.accessibility')}
          />
          <SettingsLink
            href="/legal/privacy"
            Icon={ShieldCheck}
            label={t('settings.privacyPolicy')}
          />
          <SettingsLink href="/legal/terms" Icon={FileText} label={t('settings.terms')} />
          <SettingsLink href="/legal/commerce" Icon={Scale} label={t('settings.commerce')} />
        </Card>
      </section>

      <section className="space-y-3 px-5">
        <SectionLabel title={t('settings.about')} />
        <Card inset className="relative space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-body font-semibold text-text">{commercialConfig.app.displayName}</p>
            <span className="rounded-pill bg-accent-soft/70 px-2.5 py-1 text-[0.68rem] font-bold text-accent">
              {isCommercialPreview ? t('settings.preparing') : t('settings.official')}
            </span>
          </div>
          <p className="text-caption leading-relaxed text-muted">
            {locale === 'ja'
              ? '暗い出来事をやさしく言い換えるのではなく、出来事そのものが明るく、希望や喜びを感じられるニュースだけを選びます。'
              : 'We do not soften dark events. We select news whose core event is genuinely bright, hopeful, or joyful.'}
          </p>
          <p className="pt-1 text-[0.72rem] text-muted/75">
            {t('common.version')} {commercialConfig.app.version}
            {isCommercialPreview
              ? locale === 'ja'
                ? '（商用公開前）'
                : ' (pre-release)'
              : ''}
          </p>
        </Card>
      </section>
    </div>
  );
}

function SectionLabel({ title, description }: { title: string; description?: string }) {
  return (
    <div className="px-1">
      <h2 className="text-body font-bold text-text">{title}</h2>
      {description && <p className="mt-0.5 text-caption text-muted">{description}</p>}
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
      className="group flex min-h-[4.75rem] items-center gap-3 px-4 py-3 transition-colors hover:bg-surface/45 active:bg-surface-2/60"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft/75 text-accent shadow-inner-light transition-transform duration-300 group-hover:scale-105">
        <Icon aria-hidden size={18} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-body font-semibold text-text">{label}</span>
        {hint && <span className="mt-0.5 block text-caption leading-snug text-muted">{hint}</span>}
      </span>
      <ChevronRight
        aria-hidden
        size={18}
        className="shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </Link>
  );
}
