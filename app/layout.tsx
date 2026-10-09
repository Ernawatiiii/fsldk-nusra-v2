import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SplashScreen from './components/SplashScreen' 

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://fsldk-nusra-v2.vercel.app'),
  title: {
    default: 'FSLDK Nusa Tenggara — Forum Silaturahmi Lembaga Dakwah Kampus',
    template: '%s | FSLDK Nusa Tenggara',
  },
  description:
    'Forum Silaturahmi Lembaga Dakwah Kampus Nusa Tenggara. Menyatukan 16 LDK dari Lombok hingga Sumbawa dalam satu forum kolaborasi, pembinaan, dan dakwah kampus.',
  keywords: [
    'FSLDK',
    'FSLDK Nusa Tenggara',
    'Lembaga Dakwah Kampus',
    'LDK',
    'Dakwah Kampus',
    'NTB',
    'Lombok',
    'Sumbawa',
    'Bima',
  ],
  authors: [{ name: 'FSLDK Nusa Tenggara' }],
  creator: 'FSLDK Nusa Tenggara',
  // TAMBAHKAN BAGIAN ICONS INI:
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://fsldk-nusra-v2.vercel.app',
    siteName: 'FSLDK Nusa Tenggara',
    title: 'FSLDK Nusa Tenggara — Merajut Silaturahmi, Menguatkan Dakwah',
    description:
      'Menyatukan 16 Lembaga Dakwah Kampus dari Lombok hingga Sumbawa dalam satu forum kolaborasi.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FSLDK Nusa Tenggara',
    description:
      'Menyatukan 16 Lembaga Dakwah Kampus dari Lombok hingga Sumbawa dalam satu forum kolaborasi.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="flex flex-col min-h-screen bg-nusra-sand text-nusra-ink">
        <SplashScreen />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}