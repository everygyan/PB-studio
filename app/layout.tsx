import type { Metadata } from 'next';
import { Lora, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EveryGyan - Minimalist Personal Journal & Essays',
  description:
    'A refined, minimalist personal blog and essay publication featuring thoughtful long-form writing, typography-first reading experience, and an integrated threaded comment system.',
  openGraph: {
    title: 'EveryGyan - Minimalist Personal Journal & Essays',
    description:
      'A refined, minimalist personal blog and essay publication featuring thoughtful long-form writing, typography-first reading experience, and an integrated threaded comment system.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EveryGyan - Minimalist Personal Journal & Essays',
    description:
      'A refined, minimalist personal blog and essay publication featuring thoughtful long-form writing, typography-first reading experience, and an integrated threaded comment system.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
