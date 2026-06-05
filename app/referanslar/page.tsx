import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Referanslar — Birlikte Çalıştığımız Kurumlar',
  description:
    'Biruni Üniversitesi, Boyner, Beykent Üniversitesi ve daha fazlası — Lukas Teknik\'in mekanik tesisat, yangın sistemleri ve endüstriyel ürün tedariği sağladığı 40+ kurumsal referans.',
  openGraph: {
    title: 'Referanslar — Lukas Teknik',
    description:
      'Üniversiteler, hastaneler, AVM ve otel projelerinde mekanik tesisat ekipmanları tedariki. 40+ kurumsal referans.',
    url: 'https://www.lukasteknik.com/referanslar',
    images: [{
      url: 'https://images.unsplash.com/photo-1698031610493-c19fa20dfeab?w=1200&q=85&fit=crop',
      width: 1200, height: 630,
      alt: 'Lukas Teknik Referanslar',
    }],
  },
  alternates: { canonical: 'https://www.lukasteknik.com/referanslar' },
}

const REFS = [
  { name: 'Biruni Üniversitesi', cat: 'Eğitim · Kampüs' },
  { name: 'Boyner', cat: 'Perakende · Mağazacılık' },
  { name: 'Beykent Üniversitesi', cat: 'Eğitim · Kampüs' },
  { name: 'Kültür Üniversitesi', cat: 'Eğitim · Kampüs' },
  { name: 'AVM & Plaza Projeleri', cat: 'Ticari' },
  { name: 'Otel & Konaklama', cat: 'Turizm' },
  { name: 'Hastane Tesisatı', cat: 'Sağlık' },
  { name: 'Endüstriyel Tesisler', cat: 'Üretim' },
]

const STATS = [
  { num: '1.200+', label: 'Tamamlanan proje' },
  { num: '40+', label: 'Kurumsal müşteri' },
  { num: '15+', label: 'Yıllık tecrübe' },
  { num: '%98', label: 'Tekrar çalışma oranı' },
]

const PROJECTS = [
  { cat: 'Eğitim Kampüsü', title: 'Üniversite kampüsü mekanik tesisat tedariği', desc: 'Kampüs binaları için yangın sistemi, vana grupları ve ısıtma-soğutma ekipmanlarının tam tedariği.', year: '2024', scope: 'Yangın · Isı · Vana' },
  { cat: 'Perakende', title: 'Mağaza zinciri iklimlendirme ekipmanı', desc: 'Çok lokasyonlu perakende projesi için soğutma ve havalandırma ekipmanlarının planlı tedariği.', year: '2023', scope: 'İklimlendirme' },
  { cat: 'Ticari Bina', title: 'Plaza yangın & pompa sistemi', desc: 'Yüksek katlı ticari bina için sprinkler, hidrant ve basınçlandırma pompa grupları.', year: '2024', scope: 'Yangın · Pompa' },
  { cat: 'Sağlık', title: 'Hastane mekanik tesisat malzemeleri', desc: 'Kritik tesisat için sertifikalı vana, boru ve bağlantı elemanlarının tedariği.', year: '2023', scope: 'Vana · Tesisat' },
  { cat: 'Turizm', title: 'Otel ısıtma-soğutma sistemi', desc: 'Konaklama tesisi için kazan dairesi ekipmanı ve fan-coil sistemleri tedariği.', year: '2022', scope: 'Isı · Soğutma' },
  { cat: 'Endüstri', title: 'Üretim tesisi havalandırma projesi', desc: 'Fabrika için endüstriyel fan, kanal ve damper sistemlerinin komple tedariği.', year: '2024', scope: 'Havalandırma' },
]

const TESTIMONIALS = [
  { quote: 'Malzeme listemizi gönderdik, aynı gün detaylı teklif aldık. Teslimat söz verilen tarihte eksiksiz geldi.', name: 'Mekanik Proje Müdürü', role: 'Kampüs Yatırımı', initials: 'MP' },
  { quote: 'Yangın sistemi ekipmanlarında sertifika ve uyumluluk konusunda çok titizler. Denetimden sorunsuz geçtik.', name: 'Tesis Yöneticisi', role: 'Ticari Bina', initials: 'TY' },
  { quote: 'Doğru ürünü seçmemizde teknik ekipleri yönlendirici oldu. Sadece satıcı değil, gerçek bir çözüm ortağı.', name: 'Saha Şefi', role: 'Endüstriyel Tesis', initials: 'SŞ' },
]

const Star = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px' }}>
    <path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.8 5.9 20.4l1.5-6.8L2.2 9l6.9-.7z" />
  </svg>
)

export default function ReferanslarPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          breadcrumb="Referanslar"
          title="Bize güvenen kurumlar"
          description="Üniversitelerden büyük ölçekli ticari projelere — mekanik tesisat ve endüstriyel ürün tedariğinde tercih edilen çözüm ortağıyız."
        />

        {/* Logo wall */}
        <section className="section">
          <div className="container">
            <div style={{ marginBottom: '48px' }}>
              <span className="section-label">Referans Kurumlar</span>
              <h2 className="h2" style={{ marginTop: '16px' }}>Birlikte çalıştığımız markalar</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="logo-grid">
              {REFS.map((r) => (
                <div key={r.name} className="card" style={{ aspectRatio: '16/9', display: 'grid', placeItems: 'center', textAlign: 'center', padding: '20px' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'var(--ink-2)', letterSpacing: '-.01em', lineHeight: 1.2 }}>{r.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--ink-faint)', marginTop: '6px', fontWeight: 500 }}>{r.cat}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section-sm" style={{ background: 'var(--ink)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px' }} className="stats-grid">
              {STATS.map((s) => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(40px,5vw,56px)', color: '#fff', lineHeight: 1 }}>{s.num}</div>
                  <div style={{ color: '#aab0aa', marginTop: '10px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projeler */}
        <section className="section">
          <div className="container">
            <div style={{ marginBottom: '48px' }}>
              <span className="section-label">Öne Çıkan Projeler</span>
              <h2 className="h2" style={{ marginTop: '16px' }}>Tedariğini üstlendiğimiz işler</h2>
              <p style={{ marginTop: '16px', color: 'var(--ink-soft)', fontSize: '17px' }}>Farklı sektörlerde, farklı ölçeklerde mekanik tesisat ve ekipman tedariği projelerimizden bir seçki.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '26px' }} className="proj-grid">
              {PROJECTS.map((p) => (
                <article key={p.title} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ aspectRatio: '16/11', background: 'linear-gradient(135deg, var(--brand-tint) 0%, var(--bg-soft-2) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>🏗️</div>
                  <div style={{ padding: '22px 24px 26px', flex: 1 }}>
                    <span style={{ display: 'inline-block', padding: '4px 11px', background: 'var(--brand-tint)', color: 'var(--brand-700)', borderRadius: 'var(--r-pill)', fontSize: '12px', fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '12px' }}>{p.cat}</span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '19px', lineHeight: 1.25, marginBottom: '8px' }}>{p.title}</h3>
                    <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>{p.desc}</p>
                    <div style={{ marginTop: '14px', display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--ink-faint)', fontFamily: 'var(--font-display)', fontWeight: 500 }}>
                      <span>{p.year}</span><span>{p.scope}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section" style={{ background: 'var(--bg-soft)' }}>
          <div className="container">
            <div style={{ marginBottom: '48px' }}>
              <span className="section-label">Müşteri Yorumları</span>
              <h2 className="h2" style={{ marginTop: '16px' }}>Çalıştığımız ekiplerin görüşleri</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="testi-grid">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: '34px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'flex', gap: '3px', color: 'var(--brand)' }}>
                    {[...Array(5)].map((_, i) => <Star key={i} />)}
                  </div>
                  <p style={{ fontSize: '16.5px', lineHeight: 1.6, color: 'var(--ink-2)', flex: 1 }}>&ldquo;{t.quote}&rdquo;</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                    <span style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'var(--brand-tint)', color: 'var(--brand-700)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>{t.initials}</span>
                    <div>
                      <b style={{ fontFamily: 'var(--font-display)', fontSize: '15px', display: 'block' }}>{t.name}</b>
                      <span style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-sm">
          <div className="container">
            <div style={{ background: 'linear-gradient(120deg,var(--brand-deep),var(--brand-700))', borderRadius: '28px', padding: '56px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
                <div>
                  <h2 style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px,3.6vw,40px)', maxWidth: '620px' }}>Siz de referanslarımıza katılın</h2>
                  <p style={{ color: '#dcefce', marginTop: '12px', fontSize: '18px' }}>Projenizin malzeme ihtiyacını birlikte planlayalım.</p>
                </div>
                <Link href="/iletisim" style={{ display: 'inline-flex', alignItems: 'center', padding: '16px 30px', borderRadius: 'var(--r-pill)', background: '#fff', color: 'var(--brand-700)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '17px', textDecoration: 'none' }}>İletişime Geç</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .logo-grid { grid-template-columns: 1fr 1fr !important; }
          .proj-grid { grid-template-columns: 1fr !important; }
          .testi-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </>
  )
}
