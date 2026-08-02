import type { ReactNode } from 'react';

interface EmptyStateProps {
  glyph: string;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ glyph, title, description, action }: EmptyStateProps) {
  return (
    <section
      aria-labelledby="empty-state-title"
      className="mx-5 mt-4 flex flex-col items-center overflow-hidden rounded-panel border border-white/40 bg-surface/60 px-8 py-12 text-center shadow-soft backdrop-blur-sm"
    >
      <div className="relative mb-5 flex h-28 w-28 items-center justify-center">
        <div className="absolute inset-0 animate-breathe rounded-full bg-accent-soft/75 blur-xl" />
        <div className="ambient-ring relative flex h-20 w-20 animate-float items-center justify-center rounded-full bg-white/35 text-4xl shadow-glow backdrop-blur-sm">
          {glyph}
        </div>
      </div>
      <h2 id="empty-state-title" className="text-h2 font-bold text-text">
        {title}
      </h2>
      <p className="mt-2 max-w-xs text-body leading-relaxed text-muted">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </section>
  );
}
