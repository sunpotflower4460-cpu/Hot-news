import { Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface PlanCardProps {
  name: string;
  price: string;
  priceNote?: string;
  features: string[];
  highlight?: boolean;
  eyebrow?: string;
}

export function PlanCard({
  name,
  price,
  priceNote,
  features,
  highlight = false,
  eyebrow,
}: PlanCardProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-panel border p-5 shadow-soft',
        highlight
          ? 'border-accent/20 bg-accent-soft/50 shadow-glow'
          : 'border-line/55 bg-surface/72 backdrop-blur-sm',
      )}
    >
      {highlight && (
        <div className="absolute -right-10 -top-12 h-36 w-36 animate-breathe rounded-full bg-white/35 blur-3xl" />
      )}
      <div className="relative flex items-start justify-between gap-4">
        <div>
          {eyebrow && (
            <div className="mb-1.5 flex items-center gap-1.5 text-accent">
              <Sparkles size={12} />
              <span className="text-[0.66rem] font-bold tracking-[0.12em]">{eyebrow}</span>
            </div>
          )}
          <h2 className="text-h2 font-bold text-text">{name}</h2>
        </div>
        <div className="text-right">
          <span className="font-rounded text-h2 font-bold text-text">{price}</span>
          {priceNote && <span className="ml-1 text-caption text-muted">{priceNote}</span>}
        </div>
      </div>
      <ul className="relative mt-4 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-body leading-relaxed text-text/90">
            <span
              className={cn(
                'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                highlight ? 'bg-white/45 text-accent shadow-inner-light' : 'bg-surface-2 text-muted',
              )}
            >
              <Check size={13} strokeWidth={2.5} />
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </section>
  );
}
