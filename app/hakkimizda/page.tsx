import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Hakkımızda — Lukas Teknik',
  description:
    'Lukas Teknik; 15+ yıllık deneyim, 8.000+ ürün kalemi ve 1.200+ tamamlanan projeyle mekanik tesisat, yangın sistemleri ve endüstriyel ürün tedariğinde güvenilir çözüm ortağınızdır.',
  openGraph: {
    title: 'Hakkımızda — Lukas Teknik',
    description:
      '15+ yıl, 1.200+ proje, 8.000+ ürün kalemi. Yangın, pompa, vana ve kazan sistemlerinde TSE & CE belgeli ürün tedariği.',
    url: 'https://www.lukasteknik.com/hakkimizda',
    images: [{
      url: 'https://images.unsplash.com/photo-1620203853151-496c7228306c?w=1200&q=85&fit=crop',
      width: 1200, height: 630,
      alt: 'Lukas Teknik Hakkımızda',
    }],
  },
  alternates: { canonical: 'https://www.lukasteknik.com/hakkimizda' },
}

const STATS = [
  { num: '15+', label: 'Yıllık tecrübe' },
  { num: '1.200+', label: 'Tamamlanan proje' },
  { num: '8.000+', label: 'Ürün kalemi' },
  { num: '850+', label: 'Memnun müşteri' },
]

const AREAS = [
  { title: 'Yangın tesisatı ekipmanları', desc: 'Sprinkler, hidrant, dolap, pompa grupları', color: 'var(--ember-tint)', iconColor: 'var(--ember)' },
  { title: 'Vana grupları', desc: 'Küresel, kelebek, çekvalf, kontrol vanaları', color: 'var(--brand-tint)', iconColor: 'var(--brand-700)' },
  { title: 'Pompa ve kazan sistemleri', desc: 'Sirkülasyon, basınçlandırma, hidrofor', color: 'var(--steel-tint)', iconColor: 'var(--steel)' },
  { title: 'Isıtma ve soğutma sistemleri', desc: 'Kazan dairesi, chiller, fan-coil ekipmanı', color: 'var(--ember-tint)', iconColor: 'var(--ember)' },
  { title: 'Mekanik tesisat malzemeleri', desc: 'Boru, fitting, kollektör, bağlantı elemanları', color: 'var(--brand-tint)', iconColor: 'var(--brand-700)' },
  { title: 'Endüstriyel hırdavat', desc: 'Bağlantı, sızdırmazlık, montaj ürünleri', color: 'var(--steel-tint)', iconColor: 'var(--steel)' },
  { title: 'Havalandırma & iklimlendirme', desc: 'Kanal, fan, damper, hava dağıtım', color: 'var(--brand-tint)', iconColor: 'var(--brand-700)' },
  { title: 'Projelendirme & tekliflendirme', desc: 'Keşiften teslimata mühendislik desteği', color: 'var(--ember-tint)', iconColor: 'var(--ember)' },
]

const VALUES = [
  { title: 'Güvenilirlik', desc: 'Söz verdiğimiz ürünü, söz verdiğimiz zamanda teslim ederiz. Sertifikalı, izlenebilir kalite.' },
  { title: 'Teknik uzmanlık', desc: 'Sadece satmıyoruz; projeye uygun doğru ürünü seçmenize mühendislik bilgimizle yardımcı oluyoruz.' },
  { title: 'Hız & stok gücü', desc: '8.000+ ürün kalemi ve geniş stokla, kritik malzemelerde aynı gün tedarik sağlarız.' },
]

const TIMELINE = [
  { year: '2011', title: 'Kuruluş', desc: 'Mekanik tesisat malzemeleri tedariği üzerine küçük bir ekiple yola çıktık.' },
  { year: '2015', title: 'Ürün yelpazesi genişledi', desc: 'Yangın sistemleri ve vana gruplarını portföyümüze ekleyerek tam kapsamlı tedarik sunmaya başladık.' },
  { year: '2019', title: 'Kurumsal projeler', desc: 'Üniversite ve büyük ölçekli ticari projelerde tercih edilen tedarikçi konumuna ulaştık.' },
  { year: '2026', title: 'Bugün', desc: '8.000+ ürün kalemi, geniş stok ve teknik kadromuzla mekanik tesisatın güvenilir çözüm merkeziyiz.' },
]

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export default function HakkimizdaPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          breadcrumb="Hakkımızda"
          title="Bir tedarikçiden fazlası,<br>proje ortağınız"
          description="Lukas Teknik; mekanik tesisat ve endüstriyel sistemlerde ürün tedariği, projelendirme ve teknik destek sunar."
        />

        {/* Intro */}
        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: '60px', alignItems: 'center' }} className="intro-split">
              <div style={{ aspectRatio: '5/4.4', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow)', position: 'relative', overflow: 'hidden' }}>
                <Image
                  src="/assets/ımages/indir.png"
                  alt="Mekanik tesisat kazan dairesi ve boru sistemi"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <div>
                <span className="section-label">Biz Kimiz</span>
                <h2 className="h2" style={{ marginTop: '16px' }}>Mekanik tesisatın her kaleminde tek adres</h2>
                <p style={{ marginTop: '20px', fontSize: '20px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                  Lukas Teknik, <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>mekanik tesisat ve endüstriyel malzeme tedariği</strong> alanında faaliyet gösteren bir çözüm merkezidir. Yangın sistemlerinden vana gruplarına, pompa ve kazan sistemlerinden iklimlendirme ekipmanlarına kadar geniş bir ürün yelpazesini tek çatı altında sunarız.
                </p>
                <p style={{ marginTop: '18px', fontSize: '20px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Projelere malzeme tedariği, endüstriyel ürün satışı ve tekliflendirme</strong> üzerine uzmanlaşmış durumdayız. Sahanın ihtiyacını bilir, doğru ürünü doğru zamanda teslim ederiz.
                </p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '28px' }}>
                  {['TSE Belgeli', 'CE Sertifikalı'].map((cert) => (
                    <div key={cert} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r)' }}>
                      <span style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--brand-tint)', display: 'grid', placeItems: 'center', color: 'var(--brand-700)', flexShrink: 0 }}>
                        <CheckIcon />
                      </span>
                      <div>
                        <b style={{ fontFamily: 'var(--font-display)', fontSize: '15px', display: 'block' }}>{cert}</b>
                        <span style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>Standartlara uygun</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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

        {/* Mission / Vision */}
        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }} className="vm-grid">
              {[
                { title: 'Misyonumuz', color: 'var(--brand-tint)', iconColor: 'var(--brand-700)', text: 'Mekanik tesisat projelerinin ihtiyaç duyduğu tüm ürün ve ekipmanı; doğru kalite, doğru fiyat ve doğru zamanda tedarik ederek müşterilerimizin işlerini kolaylaştırmak. Her projede güvenilir, çözüm odaklı bir ortak olmak.' },
                { title: 'Vizyonumuz', color: 'var(--steel-tint)', iconColor: 'var(--steel)', text: "Türkiye'de mekanik tesisat ve endüstriyel ürün tedariğinde akla ilk gelen, teknik bilgisi ve stok gücüyle fark yaratan; kurumların uzun vadeli iş ortağı haline gelen bir marka olmak." },
              ].map((item) => (
                <div key={item.title} style={{ padding: '34px', background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '13px', background: item.color, display: 'grid', placeItems: 'center', color: item.iconColor, marginBottom: '20px' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
                      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" />
                    </svg>
                  </div>
                  <h3 className="h3" style={{ marginBottom: '12px', fontSize: '23px' }}>{item.title}</h3>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '16px', lineHeight: 1.6 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Faaliyet Alanları */}
        <section className="section" style={{ background: 'var(--bg-soft)' }}>
          <div className="container">
            <div style={{ marginBottom: '48px' }}>
              <span className="section-label">Faaliyet Alanlarımız</span>
              <h2 className="h2" style={{ marginTop: '16px' }}>Mekanik tesisatın tüm kalemleri</h2>
              <p style={{ marginTop: '16px', color: 'var(--ink-soft)', fontSize: '17px' }}>Projenizin gerektirdiği her ekipmanı uyumlu ve sertifikalı şekilde temin ederiz.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px 30px' }} className="areas-grid">
              {AREAS.map((area) => (
                <div key={area.title} style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: area.color, display: 'grid', placeItems: 'center', color: area.iconColor, flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '23px', height: '23px' }}>
                      <circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 3" />
                    </svg>
                  </div>
                  <div>
                    <b style={{ fontFamily: 'var(--font-display)', fontSize: '16.5px', fontWeight: 600 }}>{area.title}</b>
                    <span style={{ display: 'block', fontSize: '14px', color: 'var(--ink-soft)', marginTop: '2px' }}>{area.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Değerler */}
        <section className="section">
          <div className="container">
            <div style={{ marginBottom: '48px' }}>
              <span className="section-label">Değerlerimiz</span>
              <h2 className="h2" style={{ marginTop: '16px' }}>Bizi farklı kılan ne?</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="values-grid">
              {VALUES.map((v) => (
                <div key={v.title} style={{ padding: '30px', background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '13px', background: 'var(--brand-tint)', display: 'grid', placeItems: 'center', color: 'var(--brand-700)', marginBottom: '18px' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <h4 className="h3" style={{ marginBottom: '8px', fontSize: '19px' }}>{v.title}</h4>
                  <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section" style={{ background: 'var(--bg-soft)' }}>
          <div className="container">
            <div style={{ marginBottom: '48px' }}>
              <span className="section-label">Yolculuğumuz</span>
              <h2 className="h2" style={{ marginTop: '16px' }}>Bugüne nasıl geldik</h2>
            </div>
            <div style={{ maxWidth: '720px' }}>
              {TIMELINE.map((item, i) => (
                <div key={item.year} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '28px', padding: '24px 0', borderBottom: i < TIMELINE.length - 1 ? '1px solid var(--line)' : 'none', alignItems: 'start' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', color: 'var(--brand-700)' }}>{item.year}</div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '19px', marginBottom: '6px' }}>{item.title}</h4>
                    <p style={{ color: 'var(--ink-soft)', fontSize: '15.5px', lineHeight: 1.6 }}>{item.desc}</p>
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
                  <h2 style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px,3.6vw,40px)', maxWidth: '620px' }}>Projeniz için doğru ortağı seçin</h2>
                  <p style={{ color: '#dcefce', marginTop: '12px', fontSize: '18px' }}>Malzeme listenizi gönderin, ekibimiz en uygun çözümü hazırlasın.</p>
                </div>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <a href="https://wa.me/905056995245?text=Merhaba%2C%20%C3%BCr%C3%BCn%20ve%20fiyat%20bilgisi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 30px', borderRadius: 'var(--r-pill)', background: '#fff', color: 'var(--brand-700)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '17px', textDecoration: 'none' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px', flexShrink: 0 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp İle İletişime Geçin
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .intro-split { grid-template-columns: 1fr !important; gap: 36px !important; }
          .vm-grid { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: 1fr !important; }
          .areas-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </>
  )
}
