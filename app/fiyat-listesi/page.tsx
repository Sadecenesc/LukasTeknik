import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import FiyatListesi from './FiyatListesi'

export const metadata: Metadata = {
  title: 'Fiyat Listesi — Marka Bazlı Güncel PDF Fiyat Listeleri',
  description:
    'Flamco, Grundfos, Honeywell, Danfoss, Daikin ve daha fazlası — Türkiye distribütörü olduğumuz markaların güncel PDF fiyat listelerine ücretsiz ulaşın. Proje bazlı net fiyat için teklif formu.',
  openGraph: {
    title: 'Fiyat Listesi — Lukas Teknik',
    description:
      'Mekanik tesisat markalarının güncel PDF fiyat listeleri. Flamco, Grundfos, Honeywell, Danfoss ve daha fazlası.',
    url: 'https://www.lukasteknik.com/fiyat-listesi',
    images: [{
      url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85&fit=crop',
      width: 1200, height: 630,
      alt: 'Lukas Teknik Fiyat Listesi',
    }],
  },
  alternates: { canonical: 'https://www.lukasteknik.com/fiyat-listesi' },
}

export default function FiyatListesiPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          breadcrumb="Fiyat Listesi"
          title="Fiyat Listesi"
          description="Ürün gruplarımıza ait güncel fiyat aralıkları. Proje bazlı net fiyat ve iskonto için ürün listenizi gönderin."
        />
        <section className="section">
          <div className="container">
            <FiyatListesi />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
