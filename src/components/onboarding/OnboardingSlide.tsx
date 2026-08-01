export interface Slide {
  glyph: string;
  title: string;
  body: string;
}

export function OnboardingSlide({ slide }: { slide: Slide }) {
  return (
    <div className="flex flex-col items-center px-7 text-center">
      <div className="soft-surface relative mb-7 flex h-40 w-40 items-center justify-center overflow-hidden rounded-[3rem] shadow-float">
        <div className="absolute -right-7 -top-8 h-24 w-24 animate-breathe rounded-full bg-accent-soft/75 blur-2xl" />
        <div className="absolute -bottom-9 -left-8 h-24 w-24 rounded-full bg-white/40 blur-2xl" />
        <div className="ambient-ring relative flex h-24 w-24 animate-float items-center justify-center rounded-full bg-white/30 text-[4.35rem] shadow-glow backdrop-blur-sm">
          {slide.glyph}
        </div>
      </div>
      <h2 className="max-w-sm font-rounded text-display font-bold leading-[1.48] text-text">
        {slide.title}
      </h2>
      <p className="mt-4 max-w-xs text-body-lg leading-[1.95] text-text/75">{slide.body}</p>
    </div>
  );
}
