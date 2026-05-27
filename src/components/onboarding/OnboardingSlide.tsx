export interface Slide {
  glyph: string;
  title: string;
  body: string;
}

export function OnboardingSlide({ slide }: { slide: Slide }) {
  return (
    <div className="flex flex-col items-center px-8 text-center">
      <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-white/40 text-6xl shadow-soft backdrop-blur">
        {slide.glyph}
      </div>
      <h2 className="font-rounded text-display font-bold leading-snug text-text">{slide.title}</h2>
      <p className="mt-3 max-w-xs text-body-lg leading-relaxed text-text/80">{slide.body}</p>
    </div>
  );
}
