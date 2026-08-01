import { Sparkles } from 'lucide-react';

export function WhyComfortBlock({ text }: { text: string }) {
  return (
    <aside className="rounded-card bg-accent-soft/70 p-5">
      <div className="mb-1.5 flex items-center gap-1.5 text-accent">
        <Sparkles size={16} className="fill-accent/30" />
        <h2 className="text-caption font-bold tracking-wide">このニュースの明るいところ</h2>
      </div>
      <p className="text-body leading-relaxed text-text/90">{text}</p>
    </aside>
  );
}
