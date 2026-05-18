import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

/** Load Inter with variable font weight */
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

/** Load JetBrains Mono for code/badge elements */
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

/** ── SEO Metadata ── */
export const metadata: Metadata = {
  title: 'Jakka Uma Surya Teja | AI/ML Engineer & GenAI Developer',
  description:
    'Portfolio of Jakka Uma Surya Teja — AI/ML Engineer specializing in Generative AI, NLP, LLMs, RAG systems, and Data Engineering. Based in Hyderabad, India.',
  keywords: [
    'AI/ML Engineer',
    'GenAI Developer',
    'NLP Engineer',
    'LLM Builder',
    'Data Engineer',
    'Generative AI',
    'RAG Systems',
    'Hyderabad',
    'Uma Surya Teja',
  ],
  authors: [{ name: 'Jakka Uma Surya Teja', url: 'https://github.com/umasuryateja' }],
  creator: 'Jakka Uma Surya Teja',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://umasuryateja.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Uma Surya Teja Portfolio',
    title: 'Jakka Uma Surya Teja | AI/ML Engineer & GenAI Developer',
    description:
      'Building intelligent AI-powered applications using Machine Learning, Generative AI, NLP, RAG systems, and Data Engineering workflows.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jakka Uma Surya Teja — AI/ML Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jakka Uma Surya Teja | AI/ML Engineer',
    description:
      'Building intelligent AI-powered applications using Machine Learning, Generative AI, NLP, RAG systems, and Data Engineering workflows.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050810',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable}`}>
      <body className="bg-background text-text-primary antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
