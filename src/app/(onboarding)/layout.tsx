import { PhoneFrame } from '@/components/layout/PhoneFrame';
import { SkyBackground } from '@/components/theme/SkyBackground';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <PhoneFrame>
      <SkyBackground full />
      <main className="no-scrollbar relative z-10 flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </PhoneFrame>
  );
}
