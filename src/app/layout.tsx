import type { Metadata } from 'next';
import { brand } from '@/lib/shop';
import './globals.css';
import './overlays.css';

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.tagline} | Nepali Spices`,
  description: 'A little spice. A lot of home. Explore a collection of Nepali masala blends, kitchen essentials, and recipes inspired by the flavours of Nepal.',
  openGraph: { title: `${brand.name} — ${brand.tagline}`, description: 'Spices, stories, and the flavours of Nepal.', locale: 'en_NP', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
