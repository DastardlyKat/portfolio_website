import type { Metadata } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { PageBackground } from '@/components/layout/PageBackground';
import { Cursor } from '@/components/ui/Cursor';
import { SmoothScroll } from '@/components/layout/SmoothScroll';

const display = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display'
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body'
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: 'Swakshar Bora — Full-Stack & Embedded Engineer',
  description:
    'Portfolio of Swakshar Bora — full-stack development (React, Next.js, Node.js, FastAPI, Prisma), 3D/CAD design in Fusion 360, and machine learning, deep learning, and computer vision projects.',
  metadataBase: new URL('https://portfolio-website-ashen-ten-36.vercel.app'),
  openGraph: {
    title: 'Swakshar Bora — Full-Stack & Embedded Engineer',
    description:
      'Portfolio of Swakshar Bora — full-stack development, 3D/CAD design, and ML/DL/computer vision projects.',
    url: 'https://portfolio-website-ashen-ten-36.vercel.app',
    siteName: 'Swakshar Bora Portfolio',
    images: [
     {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
}



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body antialiased">
        <PageBackground />
        <SmoothScroll />
        <Cursor />
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}