import { CloudSun, Sparkles } from 'lucide-react';
import { T } from '@/components/i18n/T';
import { LinkButton } from '@/components/ui/LinkButton';

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-bg px-8 text-center"
    >
      <div className="absolute left-1/2 top-[18%] h-52 w-52 -translate-x-1/2 animate-breathe rounded-full bg-accent-soft/70 blur-3xl" />
      <section className="soft-surface relative w-full max-w-sm rounded-panel px-7 py-10 shadow-float">
        <div className="ambient-ring mx-auto flex h-24 w-24 animate-float items-center justify-center rounded-full bg-white/35 text-accent shadow-glow backdrop-blur-sm">
          <CloudSun aria-hidden size={44} strokeWidth={1.5} />
        </div>
        <div className="mt-6 flex items-center justify-center gap-1.5 text-accent">
          <Sparkles aria-hidden size={14} />
          <span className="text-[0.7rem] font-bold tracking-[0.12em]">LOST LIGHT</span>
        </div>
        <T id="notFound.title" as="h1" className="mt-2 text-h1 font-bold text-text" />
        <T
          id="notFound.body"
          as="p"
          className="mx-auto mt-3 max-w-xs text-body leading-relaxed text-muted"
        />
        <LinkButton href="/home" variant="soft" size="lg" className="mt-7 w-full">
          <T id="notFound.home" />
        </LinkButton>
      </section>
    </main>
  );
}
