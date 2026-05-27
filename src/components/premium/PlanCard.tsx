import { Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface PlanCardProps {
  name: string;
  price: string;
  priceNote?: string;
  features: string[];
  highlight?: boolean;
}

export function PlanCard({ name, price, priceNote, features, highlight = false }: PlanCardProps) {
  return (
    <div
      className={cn(
        'rounded-card border p-5',
        highlight ? 'border-accent/40 bg-accent-soft/40 shadow-glow' : 'border-line/70 bg-surface',
      )}
    >
      <div className="flex items-baseline justify-between">
        <h3 className="text-h2 font-bold text-text">{name}</h3>
        <div className="text-right">
          <span className="text-h2 font-bold text-text">{price}</span>
          {priceNote && <span className="ml-1 text-caption text-muted">{priceNote}</span>}
        </div>
      </div>
      <ul className="mt-4 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-body text-text/90">
            <Check
              size={18}
              className={cn('mt-0.5 shrink-0', highlight ? 'text-accent' : 'text-muted')}
            />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
