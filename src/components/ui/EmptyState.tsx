import type { ReactNode } from 'react';

interface EmptyStateProps {
  glyph: string;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ glyph, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-8 py-16 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent-soft text-4xl">
        {glyph}
      </div>
      <h3 className="mb-2 text-h2 text-text">{title}</h3>
      <p className="mb-6 max-w-xs text-body text-muted">{description}</p>
      {action}
    </div>
  );
}
