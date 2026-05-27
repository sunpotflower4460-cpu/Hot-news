'use client';

import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { Card } from '@/components/ui/Card';
import { Toggle } from '@/components/ui/Toggle';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { useHydrated } from '@/lib/utils/useHydrated';
import { CATEGORIES } from '@/mock/categories';
import { cn } from '@/lib/utils/cn';

export default function NotificationsPage() {
  const hydrated = useHydrated();
  const s = useSettingsStore();

  return (
    <div className="animate-fade-up space-y-6 pb-8">
      <ScreenHeader title="通知" subtitle="届けかたは、あなたのペースで" back />

      <section className="space-y-3 px-5">
        <h2 className="text-caption font-bold text-muted">届くタイミング</h2>
        <Card className="divide-y divide-line/60">
          <Row label="朝のごあいさつ" hint="6:00ごろ、今日のほっと3本">
            <Toggle checked={hydrated && s.morningNotify} onChange={s.setMorningNotify} label="朝のごあいさつ" />
          </Row>
          <Row label="夜の短いお話" hint="22:00ごろ、寝る前にひとつ">
            <Toggle checked={hydrated && s.nightNotify} onChange={s.setNightNotify} label="夜の短いお話" />
          </Row>
          <Row label="週刊ほっとまとめ" hint="日曜の朝に、一週間ぶん">
            <Toggle checked={hydrated && s.weeklyDigest} onChange={s.setWeeklyDigest} label="週刊ほっとまとめ" />
          </Row>
        </Card>
      </section>

      <section className="space-y-3 px-5">
        <h2 className="text-caption font-bold text-muted">テーマ別のお知らせ</h2>
        <p className="-mt-1 text-caption text-muted">気になるテーマだけ、そっとお知らせします。</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const active = hydrated && s.topicNotify.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => s.toggleTopic(c.id)}
                aria-pressed={active}
                className={cn(
                  'rounded-pill border px-3.5 py-2 text-caption font-medium transition-colors',
                  active ? 'border-transparent text-white' : 'border-line bg-surface text-muted',
                )}
                style={active ? { backgroundColor: `hsl(${c.accent})` } : undefined}
              >
                {c.glyph} {c.labelJa}
              </button>
            );
          })}
        </div>
      </section>

      <p className="px-5 text-center text-[0.7rem] text-muted/70">
        ※ これは外観プレビューです。実際の通知はまだ送信されません。
      </p>
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
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div className="flex-1">
        <p className="text-body font-medium text-text">{label}</p>
        <p className="text-caption text-muted">{hint}</p>
      </div>
      {children}
    </div>
  );
}
