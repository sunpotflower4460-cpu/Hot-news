import { BottomTabBar } from '@/components/layout/BottomTabBar';
import { PhoneFrame } from '@/components/layout/PhoneFrame';
import { SkyBackground } from '@/components/theme/SkyBackground';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <PhoneFrame>
      <SkyBackground />
      <main
        id="main-content"
        tabIndex={-1}
        className="no-scrollbar relative z-10 flex-1 overflow-y-auto overflow-x-hidden scroll-smooth"
      >
        {children}
      </main>
      <BottomTabBar />
    </PhoneFrame>
  );
}
