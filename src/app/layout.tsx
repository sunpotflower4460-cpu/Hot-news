import type { Metadata, Viewport } from 'next';
import { Noto_Sans_JP, Noto_Serif_JP, Zen_Maru_Gothic } from 'next/font/google';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { ServiceWorkerRegister } from '@/components/pwa/ServiceWorkerRegister';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { commercialConfig, isCommercialPreview } from '@/config/commercial';
import './globals.css';
import './ux-polish.css';

const sans = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  preload: false,
  display: 'swap',
  variable: '--font-sans',
});

const serif = Noto_Serif_JP({
  weight: ['400', '600'],
  preload: false,
  display: 'swap',
  variable: '--font-serif',
});

const rounded = Zen_Maru_Gothic({
  weight: ['500', '700'],
  preload: false,
  display: 'swap',
  variable: '--font-rounded',
});

const description =
  '世界の中から、出来事そのものが明るく、希望や喜びを感じられるニュースだけを届けるアプリ。';
const publicBaseUrl = commercialConfig.app.publicBaseUrl.trim();

export const metadata: Metadata = {
  ...(publicBaseUrl ? { metadataBase: new URL(publicBaseUrl) } : {}),
  title: {
    default: commercialConfig.app.displayName,
    template: `%s｜${commercialConfig.app.name}`,
  },
  description,
  applicationName: commercialConfig.app.name,
  category: 'news',
  referrer: 'no-referrer',
  robots: isCommercialPreview
    ? {
        index: false,
        follow: false,
        noarchive: true,
        nocache: true,
      }
    : {
        index: true,
        follow: true,
      },
  icons: {
    icon: '/icons/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: commercialConfig.app.name,
    title: commercialConfig.app.displayName,
    description,
  },
  twitter: {
    card: 'summary',
    title: commercialConfig.app.displayName,
    description,
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: commercialConfig.app.name,
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fffaf2' },
    { media: '(prefers-color-scheme: dark)', color: '#10131c' },
  ],
};

const NO_FLASH = `(function(){try{var d=document.documentElement;var pref='auto',ov=null;var raw=localStorage.getItem('hotnews-theme');if(raw){var p=JSON.parse(raw);if(p&&p.state){pref=p.state.pref||'auto';ov=p.state.timeOverride||null;}}var h=new Date().getHours();var t=ov||(h>=5&&h<10?'morning':h>=10&&h<16?'day':h>=16&&h<19?'evening':'night');var m=pref==='light'?'light':pref==='dark'?'dark':(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');if(location.pathname.indexOf('/night')===0){t='night';m='dark';}d.setAttribute('data-theme',m);d.setAttribute('data-time',t);d.style.colorScheme=m;}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      className={`${sans.variable} ${serif.variable} ${rounded.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
      </head>
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-pill bg-accent-strong px-4 py-2.5 text-caption font-bold text-white shadow-glow transition-transform focus:translate-y-0"
        >
          本文へ移動
        </a>
        <MotionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </MotionProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
