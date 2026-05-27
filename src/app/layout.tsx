import type { Metadata, Viewport } from 'next';
import { Noto_Sans_JP, Noto_Serif_JP, Zen_Maru_Gothic } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ServiceWorkerRegister } from '@/components/pwa/ServiceWorkerRegister';
import './globals.css';

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

export const metadata: Metadata = {
  title: 'こころがほっとするニュース',
  description:
    '世界の中から、こころがほっとする出来事だけをそっとお届けする、やさしいニュースアプリ。',
  applicationName: 'こころのニュース',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'こころのニュース',
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

const NO_FLASH = `(function(){try{var d=document.documentElement;var pref='auto',ov=null,fs='standard';var raw=localStorage.getItem('hotnews-theme');if(raw){var p=JSON.parse(raw);if(p&&p.state){pref=p.state.pref||'auto';ov=p.state.timeOverride||null;fs=p.state.fontScale||'standard';}}var h=new Date().getHours();var t=ov||(h>=5&&h<10?'morning':h>=10&&h<16?'day':h>=16&&h<19?'evening':'night');var m=pref==='light'?'light':pref==='dark'?'dark':(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');if(location.pathname.indexOf('/night')===0){t='night';m='dark';}d.setAttribute('data-theme',m);d.setAttribute('data-time',t);d.setAttribute('data-textsize',fs);d.style.colorScheme=m;}catch(e){}})();`;

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
        <ThemeProvider>{children}</ThemeProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
