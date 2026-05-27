import { Moon } from 'lucide-react';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { ArticleCard } from '@/components/article/ArticleCard';
import { getNightReads } from '@/lib/data/selectors';

export default async function NightPage() {
  const reads = await getNightReads();

  return (
    <div className="animate-fade-up pb-10">
      <ScreenHeader back />
      <div className="px-5 pt-1 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Moon size={26} />
        </div>
        <h1 className="font-rounded text-display font-bold text-text">寝る前モード</h1>
        <p className="mx-auto mt-2 max-w-xs text-body text-muted">
          今日も一日、おつかれさまでした。短くてやさしいお話を、ひとつだけどうぞ。
        </p>
      </div>

      <div className="mt-6 space-y-3 px-5">
        {reads.map((a) => (
          <ArticleCard key={a.id} article={a} layout="list" />
        ))}
      </div>

      <p className="px-5 pt-8 text-center text-caption text-muted">
        画面を閉じて、ゆっくりおやすみください。 🌙
      </p>
    </div>
  );
}
