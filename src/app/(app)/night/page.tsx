import { Moon, Sparkles } from 'lucide-react';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { ArticleCard } from '@/components/article/ArticleCard';
import { getNightReads } from '@/lib/data/selectors';

export default async function NightPage() {
  const reads = await getNightReads();

  return (
    <div className="pb-12">
      <ScreenHeader back />
      <div className="px-5 pt-1 text-center">
        <div className="soft-surface relative mx-auto flex max-w-sm flex-col items-center overflow-hidden rounded-panel px-6 pb-6 pt-7 shadow-float">
          <div className="absolute left-1/2 top-0 h-28 w-52 -translate-x-1/2 rounded-full bg-accent-soft/65 blur-3xl" />
          <div className="ambient-ring relative flex h-20 w-20 animate-float items-center justify-center rounded-full bg-white/24 shadow-glow backdrop-blur-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent shadow-inner-light">
              <Moon size={27} className="fill-accent/10" />
            </div>
          </div>
          <div className="relative mt-4 inline-flex items-center gap-1.5 rounded-pill bg-white/24 px-3 py-1 text-[0.7rem] font-semibold text-accent backdrop-blur-sm">
            <Sparkles size={11} />
            ONE GENTLE LIGHT
          </div>
          <h1 className="relative mt-2 font-rounded text-display font-bold text-text">寝る前モード</h1>
          <p className="relative mx-auto mt-2 max-w-xs text-body leading-relaxed text-muted">
            今日も一日、おつかれさまでした。最後に明るい出来事を、ひとつだけどうぞ。
          </p>
        </div>
      </div>

      <div className="mt-6 px-5">
        {reads.map((article) => (
          <ArticleCard key={article.id} article={article} layout="list" />
        ))}
      </div>

      <div className="px-5 pt-8 text-center">
        <p className="font-rounded text-body font-medium text-text/85">
          この光を残したまま、ゆっくりおやすみください。
        </p>
        <p className="mt-1 text-caption text-muted">画面を閉じたら、深くひと呼吸。 🌙</p>
      </div>
    </div>
  );
}
