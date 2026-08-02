import { Construction } from 'lucide-react';
import { LinkButton } from '@/components/ui/LinkButton';
import { ScreenHeader } from '@/components/layout/ScreenHeader';

export function FeatureUnavailable({ title, description }: { title: string; description: string }) {
  return (
    <div className="pb-10">
      <ScreenHeader back />
      <div className="flex min-h-[65dvh] items-center justify-center px-5 py-10">
        <section className="soft-surface w-full max-w-sm rounded-panel px-6 py-9 text-center shadow-float">
          <div className="ambient-ring mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-soft/70 text-accent shadow-glow">
            <Construction aria-hidden size={34} strokeWidth={1.6} />
          </div>
          <h1 className="mt-5 text-h2 font-bold text-text">{title}</h1>
          <p className="mt-2 text-body leading-relaxed text-muted">{description}</p>
          <LinkButton href="/home" className="mt-6 w-full" size="lg">
            ホームへもどる
          </LinkButton>
        </section>
      </div>
    </div>
  );
}
