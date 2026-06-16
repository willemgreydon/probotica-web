import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AccessibilityProvider } from '@/components/providers/AccessibilityProvider';
import { CursorProvider } from '@/components/motion/CursorProvider';
import './globals.css';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const fontDisplay = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '700'],
  display: 'swap',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ProBotica - AI Automation, Bots & Prompt Engineering',
    template: '%s · ProBotica',
  },
  description: 'AI assistants, prompt packs and automation systems for real business workflows. Built for teams that need output, not demos.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://probotica.at'),
};

export const viewport: Viewport = {
  themeColor: '#070907',
  width: 'device-width',
  initialScale: 1,
};

const INIT_SCRIPT = `(function(){try{var d=document.documentElement;var t=localStorage.getItem('probotica-theme')||'system';var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var r=t==='system'?m:t;d.dataset.theme=(r==='light'?'light':'dark');var a=localStorage.getItem('probotica-accessibility');var p=a?JSON.parse(a):{};d.dataset.contrast=p.contrast||'default';d.dataset.motion=p.motion||'default';d.dataset.transparency=p.transparency||'default';d.dataset.reading=p.reading||'default';d.dataset.colorMode=p.colorMode||'default';}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontBody.variable} ${fontDisplay.variable} ${fontMono.variable}`}
      data-theme="dark"
      data-contrast="default"
      data-motion="default"
      data-transparency="default"
      data-reading="default"
      data-color-mode="default"
      suppressHydrationWarning
    >
      <body className="bg-premium">
        <Script id="probotica-init-theme" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: INIT_SCRIPT }} />
        <ThemeProvider>
          <AccessibilityProvider>
            <CursorProvider />
            {children}
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
