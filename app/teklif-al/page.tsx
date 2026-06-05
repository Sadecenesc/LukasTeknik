import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TeklifForm from './TeklifForm'

export const metadata: Metadata = {
  title: 'Teklif Al — Aynı Gün Dönüş',
  description:
    'Mekanik tesisat ve endüstriyel ürün ihtiyacınız için hızlı ve net teklif alın. Ürün listenizi gönderin, ekibimiz en uygun çözümü ve fiyatı aynı gün hazırlasın.',
  openGraph: {
    title: 'Teklif Al — Lukas Teknik',
    description:
      'Ürün listenizi gönderin, aynı gün net fiyat alın. Yangın, pompa, vana, kazan ve iklimlendirme ekipmanlarında TSE & CE belgeli tedarik.',
    url: 'https://www.lukasteknik.com/teklif-al',
  },
  alternates: { canonical: 'https://www.lukasteknik.com/teklif-al' },
}

export default function TeklifAlPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page hero */}
        <section style={{ background: 'linear-gradient(180deg, var(--bg-soft) 0%, #fff 100%)', borderBottom: '1px solid var(--line)', padding: '56px 0 48px' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--ink-faint)', fontFamily: 'var(--font-display)', marginBottom: '20px' }}>
              <Link href="/" style={{ color: 'var(--ink-faint)', textDecoration: 'none' }}>Ana Sayfa</Link>
              <span>/</span>
              <span style={{ color: 'var(--ink-soft)' }}>Teklif Al</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-.03em', marginBottom: '16px' }}>
              Hızlı teklif alın
            </h1>
            <p style={{ color: 'var(--ink-soft)', fontSize: '18px', maxWidth: '560px', lineHeight: 1.6 }}>
              İhtiyacınızı paylaşın, ekibimiz en uygun ürünleri ve fiyatı hazırlayıp aynı gün dönüş yapsın.
            </p>
          </div>
        </section>

        {/* Form section */}
        <section className="section">
          <div className="container">
            <TeklifForm />
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .quote-layout { grid-template-columns: 1fr !important; gap: 30px !important; }
          .side-card-sticky { position: static !important; }
          .form-row-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
