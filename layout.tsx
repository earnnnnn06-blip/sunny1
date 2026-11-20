import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500'], style: ['normal', 'italic'], variable: '--f-serif', display: 'swap' });
const sans = Jost({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--f-sans', display: 'swap' });

export const metadata: Metadata = {
  title: 'Sunny Glow – SPF50+ PA++++ Sunscreen with Brightening Care',
  description: 'Sunny Glow sunscreen: advanced UVA/UVB protection with brightening care. SPF50+ PA++++ for all skin types.',
  openGraph: { title: 'Sunny Glow – Glow Confidently Every Day', description: 'Advanced UV protection with brightening care.', images: ['/product.jpg'], type: 'website' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#FFF8F0' };

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'Product', name: 'Sunny Glow Sunscreen SPF50+ PA++++',
  description: 'UVA/UVB sunscreen with brightening care and moisture for all skin types, 30 g.',
  brand: { '@type': 'Brand', name: 'Sunny Glow' }, image: '/product.jpg',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
