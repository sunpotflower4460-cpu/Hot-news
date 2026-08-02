import { Moon, Sparkles } from 'lucide-react';
import { ArticleCard } from '@/components/article/ArticleCard';
import { T } from '@/components/i18n/T';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { LinkButton } from '@/components/ui/LinkButton';
import { getNightReads } from '@/lib/data/selectors';

export default async function NightPage() {
  const reads = await getNightReads();

  return (
    <div className="pb-12">
      <ScreenHeader back />
      <div className="px-5 pt-1 text-center">
        <div className="soft-surface relative mx-auto flex h-28 w-28 items-center justify-center rounded-[2.6rem] shadow-float">
          <div className="absolute inset-3 animate-breathe rounded-full bg-accent-soft/80 blur-xl" />
          <div className="ambient-ring relative flex h-20 w-20 items-center justify-center rounded-full bg-white/30 text-accent shadow-glow">
            <Moon aria-hidden size={32} strokeWidth={1.7} />
          </div>
          <Sparkles aria-hidden size={14} className="absolute right-5 top-5 animate-twinkle text-accent" />
        </div>
        <T id="settings.night" as="h1" className="mt-5 font-rounded text-display font-bold text-text" />
        <p className="mx-auto mt-2 max-w-xs text-body leading-relaxed text-muted">
          <T id="greeting.nightSubtitle" />
        </p>
      </div>

      {reads.length === 0 ? (
        <EmptyState
          glyph="🌙"
          title={<T id="home.preparing" />}
          description={<T id="home.preparingDescription" />}
          action={
            <LinkButton href="/home" variant="soft">
              <T id="notFound.home" />
            </LinkButton>
          }
        />
      ) : (
        <div className="mt-7 px-5">
          <ArticleCard article={reads[0]} layout="list" />
          <p className="mt-7 rounded-card bg-surface/50 px-4 py-3 text-center text-caption leading-relaxed text-muted shadow-inner-light backdrop-blur-sm">
            <T id="home.progressCloseAnytime" /> 🌙
          </p>
        </div>
      )}
    </div>
  );
}
