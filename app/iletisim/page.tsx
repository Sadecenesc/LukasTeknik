import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import IletisimForm from './IletisimForm'

export const metadata: Metadata = {
  title: 'İletişim — Bize Ulaşın',
  description:
    'Ürün, fiyat veya proje danışmanlığı için Lukas Teknik ile iletişime geçin. WhatsApp, telefon veya e-posta ile mesai saatleri içinde dakikalar içinde yanıt alın. İkitelli OSB, Başakşehir / İstanbul.',
  openGraph: {
    title: 'İletişim — Lukas Teknik',
    description:
      'WhatsApp, telefon veya e-posta ile aynı gün yanıt. İkitelli OSB, Başakşehir / İstanbul.',
    url: 'https://www.lukasteknik.com/iletisim',
    images: [{
      url: 'https://images.unsplash.com/photo-1698031610493-c19fa20dfeab?w=1200&q=85&fit=crop',
      width: 1200, height: 630,
      alt: 'Lukas Teknik İletişim',
    }],
  },
  alternates: { canonical: 'https://www.lukasteknik.com/iletisim' },
}

export default function IletisimPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          breadcrumb="İletişim"
          title="İletişime geçin"
          description="Ürün, fiyat veya proje danışmanlığı için WhatsApp'tan yazın. Mesai saatleri içinde dakikalar içinde yanıt veriyoruz."
        />

        <section className="section">
          <div className="container">
            <IletisimForm />
          </div>
        </section>

        {/* Map */}
        <section style={{ padding: '0 0 80px' }}>
          <div className="container">
            <div style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--line)', height: '420px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.8829486532863!2d28.850007200000004!3d41.0059351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa517d3c176d5%3A0xc6a8b49da17b93c0!2zTFVLQVNURUtOxLBLIE1FS0FOxLBLIEVORC5NQUxaLlNBTi5UxLBDLkxURC7FnlTEsA!5e0!3m2!1str!2str!4v1780594067643!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lukas Teknik Konum"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .contact-layout { grid-template-columns: 1fr !important; gap: 36px !important; }
          .contact-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
