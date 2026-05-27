import { PhoneFrame } from '@/components/layout/PhoneFrame';
import { BottomTabBar } from '@/components/layout/BottomTabBar';
import { SkyBackground } from '@/components/theme/SkyBackground';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <PhoneFrame>
      <SkyBackground />
      <main className="no-scrollbar relative z-10 flex-1 overflow-y-auto overflow-x-hidden scroll-smooth overscroll-y-contain">
        {children}
      </main>
      <BottomTabBar />
    </PhoneFrame>
  );
}
