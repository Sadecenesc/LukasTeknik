import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import WhatsAppFloat from './WhatsAppFloat'

const BASE = 'https://www.lukasteknik.com'

const OG_IMAGE = {
  url: 'https://images.unsplash.com/photo-1698031610493-c19fa20dfeab?w=1200&q=85&fit=crop',
  width: 1200,
  height: 630,
  alt: 'Lukas Teknik — Mekanik Tesisat & Endüstriyel Çözüm Merkezi',
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    template: '%s | Lukas Teknik',
    default: 'Lukas Teknik — Mekanik Tesisat & Endüstriyel Çözüm Merkezi',
  },
  description:
    'Yangın söndürme, vana, pompa, kazan ve iklimlendirme sistemlerinde profesyonel ürün tedariği, projelendirme ve hızlı teklif. TSE & CE belgeli ürünler, aynı gün sevkiyat. İkitelli OSB, Başakşehir İstanbul.',
  keywords: [
    'mekanik tesisat', 'endüstriyel ürün', 'yangın sistemi', 'sprinkler', 'vana',
    'pompa', 'kazan', 'hidrofor', 'iklimlendirme', 'İstanbul tesisat',
    'İkitelli tesisat', 'Başakşehir tesisat', 'yangın söndürme sistemi',
    'mekanik tesisat malzemeleri', 'endüstriyel pompa', 'tesisat malzemeleri İstanbul',
    'vana satış İstanbul', 'TSE belgeli tesisat', 'fiyat listesi tesisat',
    'Flamco', 'Grundfos', 'Honeywell', 'Danfoss', 'Daikin', 'Alfa Laval',
  ],
  authors: [{ name: 'Lukas Teknik', url: BASE }],
  creator: 'Lukas Teknik',
  publisher: 'Lukas Teknik',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  icons: {
    icon: '/assets/logo.webp',
    shortcut: '/assets/logo.webp',
    apple: '/assets/logo.webp',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: BASE,
    siteName: 'Lukas Teknik',
    title: 'Lukas Teknik — Mekanik Tesisat & Endüstriyel Çözüm Merkezi',
    description:
      'Yangın söndürme, vana, pompa, kazan ve iklimlendirme sistemlerinde profesyonel ürün tedariği. TSE & CE belgeli, aynı gün teklif. İkitelli OSB, İstanbul.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lukas Teknik — Mekanik Tesisat & Endüstriyel Çözüm Merkezi',
    description:
      'Yangın söndürme, vana, pompa, kazan ve iklimlendirme sistemlerinde profesyonel ürün tedariği. TSE & CE belgeli.',
    images: [OG_IMAGE.url],
  },
  alternates: {
    canonical: BASE,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Lukas Teknik',
  description:
    'Mekanik tesisat ve endüstriyel sistemlerde ürün tedariği, projelendirme ve teknik destek. Yangın söndürme, vana, pompa, kazan ve iklimlendirme sistemlerinde TSE & CE belgeli ürün tedariki.',
  url: BASE,
  telephone: '+905056995245',
  email: 'info@lukasteknik.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Siyavuşpaşa, Köprübaşı Sk. No:29/A',
    addressLocality: 'Bahçelievler',
    addressRegion: 'İstanbul',
    postalCode: '34182',
    addressCountry: 'TR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.065,
    longitude: 28.793,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:30',
      closes: '18:30',
    },
  ],
  priceRange: '₺₺',
  image: `${BASE}/assets/logo.webp`,
  logo: `${BASE}/assets/logo.webp`,
  areaServed: [
    { '@type': 'City', name: 'İstanbul' },
    { '@type': 'City', name: 'Başakşehir' },
    { '@type': 'City', name: 'İkitelli' },
  ],
  knowsAbout: [
    'Yangın Söndürme Sistemleri', 'Sprinkler Sistemleri', 'Mekanik Tesisat',
    'Endüstriyel Pompa', 'Hidrofor', 'Vana', 'Kazan', 'İklimlendirme',
    'TSE Belgeli Ürünler', 'CE Belgeli Ürünler',
  ],
  sameAs: [],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  )
}
