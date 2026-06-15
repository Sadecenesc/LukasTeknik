import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HomeFiyatListesi from './HomeFiyatListesi'

export const metadata: Metadata = {
  title: 'Lukas Teknik — Mekanik Tesisat & Endüstriyel Çözüm Merkezi',
  description:
    'Yangın söndürme, vana, pompa, kazan ve iklimlendirme sistemlerinde TSE & CE belgeli ürün tedariği ve projelendirme. 15+ yıl, 1.200+ proje, 8.000+ ürün kalemi. Aynı gün teklif.',
  openGraph: {
    title: 'Lukas Teknik — Mekanik Tesisat & Endüstriyel Çözüm Merkezi',
    description:
      'Yangın, vana, pompa, kazan ve iklimlendirme sistemlerinde TSE & CE belgeli ürün tedariği. Aynı gün teklif, hızlı teslimat.',
    url: 'https://www.lukasteknik.com',
    images: [{
      url: 'https://images.unsplash.com/photo-1698031610493-c19fa20dfeab?w=1200&q=85&fit=crop',
      width: 1200, height: 630,
      alt: 'Lukas Teknik — Mekanik Tesisat & Endüstriyel Çözüm Merkezi',
    }],
  },
  alternates: { canonical: 'https://www.lukasteknik.com' },
}

const WHATSAPP = '905056995245'
const WA_MSG = 'Merhaba, ürün ve fiyat bilgisi almak istiyorum.'
const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WA_MSG)}`

const SERVICES = [
  { icon: '🔥', title: 'Yangın Söndürme Sistemleri', desc: 'Sprinkler, hidrant, köpük, gaz söndürme sistemleri için sertifikalı ekipman ve projelendirme.' },
  { icon: '⚙️', title: 'Pompa & Hidrofor Sistemleri', desc: 'Basınç artırma, drenaj, sirkülasyon pompası ve komple hidrofor paketleri.' },
  { icon: '🔧', title: 'Vana & Bağlantı Elemanları', desc: 'Gate, globe, check, kelebek, solenoid vanalar; flanş, rakor ve özel bağlantı parçaları.' },
  { icon: '🌡️', title: 'Kazan & Isıtma Sistemleri', desc: 'Doğalgaz ve fuel-oil kazanlar, brülörler, eşanjörler, genleşme tankları.' },
  { icon: '❄️', title: 'İklimlendirme & Soğutma', desc: 'Chiller, fan-coil, VRF sistemleri, hava kanalları ve soğutma kulesi ekipmanları.' },
  { icon: '🏭', title: 'Endüstriyel Filtreler & Armatürler', desc: 'Y tipi filtreler, manometreler, termostatlar ve endüstriyel boru armatürleri.' },
]

const STEPS = [
  { n: '01', title: 'İhtiyaç & Keşif', desc: 'Proje detaylarını ve malzeme listenizi alır, ihtiyacı netleştiririz.' },
  { n: '02', title: 'Tekliflendirme', desc: 'Uygun ürünleri seçer, fiyat ve teslim süresiyle teklifi hazırlarız.' },
  { n: '03', title: 'Tedarik', desc: 'Stok ve özel siparişleri planlar, sertifikalarla birlikte temin ederiz.' },
  { n: '04', title: 'Teslimat & Destek', desc: 'Sahaya sevk eder, devreye alma ve sonrası destekte yanınızda oluruz.' },
]

const STATS = [
  { num: '1.200+', label: 'Tamamlanan proje' },
  { num: '850+', label: 'Memnun müşteri' },
  { num: '8.000+', label: 'Ürün kalemi' },
  { num: '15+', label: 'Yıllık tecrübe' },
]

const BLOG_POSTS = [
  {
    tag: 'Yangın Sistemleri',
    date: '14 Mayıs 2025',
    title: 'Sprinkler Sistemlerde Doğru Vana Seçimi Nasıl Yapılır?',
    desc: 'NFPA 13 ve TSE standartlarına göre sprinkler sistemlerde kullanılacak vana tiplerini ve seçim kriterlerini anlattık.',
    img: 'https://images.unsplash.com/photo-1577678923709-758495cb4497?w=640&q=80&fit=crop',
  },
  {
    tag: 'Pompa Sistemleri',
    date: '28 Nisan 2025',
    title: 'Hidrofor Grubu Boyutlandırma Rehberi',
    desc: 'Bina tipi, kat sayısı ve debiye göre hidrofor grubu nasıl hesaplanır? Mühendisler için adım adım rehber.',
    img: '/assets/ımages/A_blue_ductile_iron_flanged_202606042012.jpeg',
  },
  {
    tag: 'Genel',
    date: '10 Nisan 2025',
    title: 'TSE ve CE Belgelendirmesi: Mekanik Tesisat Ürünlerinde Önemi',
    desc: 'Projelerde belgeli ürün kullanımının yasal zorunluluğu ve denetim süreçlerinde size sağladığı avantajlar.',
    img: 'https://images.unsplash.com/photo-1780034766224-04cfda73fa09?w=640&q=80&fit=crop',
  },
]

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* ===== HERO ===== */}
        <section style={{ background: 'radial-gradient(120% 80% at 85% -10%, var(--brand-tint) 0%, transparent 55%), linear-gradient(180deg,#fff 0%, var(--bg-soft) 100%)', overflow: 'hidden' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: '60px', alignItems: 'center', padding: '84px 0 76px' }} className="hero-grid">
              <div>
                <span className="section-label">Mekanik Tesisat & Endüstriyel Çözüm Merkezi</span>
                <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px,3.8vw,46px)', letterSpacing: '-.03em', marginTop: '20px', lineHeight: 1.1 }}>
                  Mekanik tesisat ve endüstriyel sistemlerde{' '}
                  <span style={{ color: 'var(--brand-700)' }}>güvenilir çözüm ortağınız</span>
                </h1>
                <p style={{ marginTop: '24px', fontSize: '21px', lineHeight: 1.55, color: 'var(--ink-soft)', maxWidth: '560px' }}>
                  Yangın, vana, pompa, kazan ve iklimlendirme sistemlerinde profesyonel ürün tedariği, projelendirme ve hızlı teklif. Doğru ürün, doğru zamanda, sahada.
                </p>
                <div style={{ display: 'flex', gap: '14px', marginTop: '34px', flexWrap: 'wrap' }}>
                  <Link href="/iletisim" className="btn btn-primary" style={{ fontSize: '17px', padding: '16px 30px' }}>
                    Hızlı Teklif Al
                  </Link>
                  <Link href="/hakkimizda" className="btn btn-outline" style={{ fontSize: '17px', padding: '16px 30px' }}>
                    Hakkımızda
                  </Link>
                </div>
                <div style={{ marginTop: '42px', display: 'flex', gap: '28px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {[{ n: '15+', l: 'Yıllık\ntecrübe' }, { n: '1.200+', l: 'Tamamlanan\nproje' }, { n: '8.000+', l: 'Ürün\nkalemi' }].map((t, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
                      {i > 0 && <div style={{ width: '1px', height: '40px', background: 'var(--line-2)' }} />}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '30px', color: 'var(--ink)', lineHeight: 1 }}>{t.n}</span>
                        <span style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.25, whiteSpace: 'pre-line' }}>{t.l}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero visual */}
              <div style={{ position: 'relative' }}>
                <div style={{ aspectRatio: '4/4.4', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-lg)', position: 'relative', overflow: 'hidden' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1698031610493-c19fa20dfeab?w=900&q=85&fit=crop"
                    alt="Mekanik tesisat boru ve vana sistemleri"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 900px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div style={{ position: 'absolute', left: '-26px', bottom: '42px', background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r)', padding: '16px 20px', boxShadow: 'var(--shadow-lg)', display: 'flex', gap: '14px', alignItems: 'center', maxWidth: '260px' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'var(--brand-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>⚡</div>
                  <div>
                    <b style={{ fontFamily: 'var(--font-display)', display: 'block', fontSize: '15px' }}>Aynı gün teklif</b>
                    <span style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>Stoktaki ürünlerde hızlı tedarik</span>
                  </div>
                </div>
                <div style={{ position: 'absolute', right: '-20px', top: '40px', background: 'var(--ink)', color: '#fff', borderRadius: 'var(--r)', padding: '14px 18px', boxShadow: 'var(--shadow-lg)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--brand)', boxShadow: '0 0 0 4px rgba(95,158,52,.25)', flexShrink: 0 }} />
                  TSE & CE belgeli ürünler
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* ===== SERVICES ===== */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
              <span className="section-label">Çözüm Alanlarımız</span>
              <h2 className="h2" style={{ marginTop: '16px' }}>Tek noktadan mekanik tesisat ve endüstriyel ürün tedariği</h2>
              <p style={{ marginTop: '16px', color: 'var(--ink-soft)', fontSize: '17px', lineHeight: 1.6 }}>
                Projenizin gerektirdiği tüm ekipman ve malzemeyi tek tedarikçiden, uyumlu ve sertifikalı şekilde temin edin.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {SERVICES.map((s) => (
                <div key={s.title} className="card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '36px' }}>{s.icon}</div>
                  <h3 className="h3">{s.title}</h3>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '15.5px', lineHeight: 1.6 }}>{s.desc}</p>
                  <Link href="/iletisim" style={{ marginTop: 'auto', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14.5px', color: 'var(--brand-700)', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
                    Teklif Al
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ABOUT SUMMARY ===== */}
        <section className="section" style={{ background: 'var(--bg-soft)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: '60px', alignItems: 'center' }} className="about-split">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '12px', aspectRatio: '5/4', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                {[
                  { src: 'https://images.unsplash.com/photo-1759148414485-5f624fe9d1ea?w=400&q=85&fit=crop', alt: 'Endüstriyel kırmızı tekerlekli vanalar' },
                  { src: 'https://images.unsplash.com/photo-1620203853151-496c7228306c?w=400&q=85&fit=crop', alt: 'Paslanmaz çelik endüstriyel ekipman' },
                  { src: 'https://images.unsplash.com/photo-1538474705339-e87de81450e8?w=400&q=85&fit=crop', alt: 'Metal boru tesisatı' },
                  { src: 'https://images.unsplash.com/photo-1689942010216-dc412bb1e7a9?w=400&q=85&fit=crop', alt: 'Endüstriyel malzeme depolama' },
                ].map(({ src, alt }, i) => (
                  <div key={i} style={{ position: 'relative', overflow: 'hidden', borderRadius: i === 0 ? 'var(--r) 0 0 0' : i === 1 ? '0 var(--r) 0 0' : i === 2 ? '0 0 0 var(--r)' : '0 0 var(--r) 0' }}>
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 900px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
              <div>
                <span className="section-label">Lukas Teknik Hakkında</span>
                <h2 className="h2" style={{ marginTop: '16px' }}>Bir tedarikçiden fazlası: proje ortağınız</h2>
                <p style={{ marginTop: '18px', fontSize: '18px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                  Lukas Teknik, mekanik tesisat projelerine malzeme tedariği, endüstriyel ürün satışı ve sistem ekipmanları konusunda uçtan uca çözüm sunar.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '26px' }}>
                  {[
                    { title: 'Geniş stok & hızlı tedarik', desc: '8.000+ ürün kalemi, kritik malzemelerde aynı gün sevkiyat.' },
                    { title: 'Projeye özel tekliflendirme', desc: 'Keşiften teslimata mühendislik desteğiyle uyumlu ürün seçimi.' },
                    { title: 'Sertifikalı ürünler', desc: 'TSE, CE ve yangın yönetmeliğine uygun, belgeli ekipman.' },
                  ].map((item) => (
                    <div key={item.title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--brand)', color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: '2px' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <div>
                        <b style={{ fontFamily: 'var(--font-display)', fontSize: '16.5px' }}>{item.title}</b>
                        <p style={{ fontSize: '15px', color: 'var(--ink-soft)', marginTop: '2px' }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/hakkimizda" className="btn btn-outline" style={{ marginTop: '30px' }}>
                  Hakkımızda
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ===== STATS ===== */}
        <section className="section-sm" style={{ background: 'var(--ink)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px' }} className="stats-grid">
              {STATS.map((s) => (
                <div key={s.label} style={{ textAlign: 'center', padding: '18px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(42px,5vw,58px)', color: '#fff', lineHeight: 1, letterSpacing: '-.03em' }}>
                    {s.num}
                  </div>
                  <div style={{ marginTop: '12px', color: '#aab0aa', fontSize: '15.5px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FİYAT LİSTESİ ===== */}
        <section className="section" style={{ background: 'var(--bg-soft)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <div>
                <span className="section-label">Fiyat Listeleri</span>
                <h2 className="h2" style={{ marginTop: '16px' }}>Marka bazlı güncel fiyat listeleri</h2>
                <p style={{ marginTop: '10px', color: 'var(--ink-soft)', fontSize: '16px', maxWidth: '520px' }}>
                  Türkiye distribütörü olduğumuz markaların PDF fiyat listelerine anında ulaşın.
                </p>
              </div>
              <Link href="/fiyat-listeleri" className="btn btn-outline">Tüm Listeler</Link>
            </div>
            <HomeFiyatListesi />
          </div>
        </section>

        {/* ===== PROCESS ===== */}
        <section className="section">
          <div className="container">
            <div style={{ maxWidth: '540px', marginBottom: '48px' }}>
              <span className="section-label">Nasıl Çalışıyoruz</span>
              <h2 className="h2" style={{ marginTop: '16px' }}>Tekliften teslimata net bir süreç</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '22px' }} className="steps-grid">
              {STEPS.map((s) => (
                <div key={s.n} className="card" style={{ padding: '28px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: 'var(--brand)', width: '44px', height: '44px', borderRadius: '12px', background: 'var(--brand-tint)', display: 'grid', placeItems: 'center', marginBottom: '18px' }}>
                    {s.n}
                  </div>
                  <h4 className="h3" style={{ marginBottom: '8px' }}>{s.title}</h4>
                  <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BLOG PREVIEW ===== */}
        <section className="section" style={{ background: 'var(--bg-soft)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap', marginBottom: '44px' }}>
              <div>
                <span className="section-label">Bilgi & Blog</span>
                <h2 className="h2" style={{ marginTop: '16px' }}>Sektörden notlar ve teknik rehberler</h2>
              </div>
              <Link href="/blog" className="btn btn-outline">Tüm yazılar</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {BLOG_POSTS.map((p) => (
                <div key={p.title} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ aspectRatio: '16/10', position: 'relative', overflow: 'hidden' }}>
                    <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, 33vw" />
                  </div>
                  <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                    <div style={{ fontSize: '13px', color: 'var(--ink-faint)', fontFamily: 'var(--font-display)', fontWeight: 500, display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ background: 'var(--brand-tint)', color: 'var(--brand-700)', padding: '2px 8px', borderRadius: 'var(--r-pill)', fontSize: '12px' }}>{p.tag}</span>
                      <span>{p.date}</span>
                    </div>
                    <h3 className="h3" style={{ fontSize: '19px', lineHeight: 1.25 }}>{p.title}</h3>
                    <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>{p.desc}</p>
                    <Link href="/blog" style={{ marginTop: 'auto', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px', color: 'var(--brand-700)', textDecoration: 'none' }}>
                      Devamını oku →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA BAND ===== */}
        <section className="section-sm">
          <div className="container">
            <div style={{ background: 'linear-gradient(120deg,var(--brand-deep),var(--brand-700))', borderRadius: '28px', padding: '56px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
                <div>
                  <h2 style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px,3.6vw,40px)', maxWidth: '620px' }}>
                    Projeniz için bugün teklif alın
                  </h2>
                  <p style={{ color: '#dcefce', marginTop: '12px', fontSize: '18px' }}>
                    Malzeme listenizi gönderin, ekibimiz en uygun çözümü ve fiyatı hazırlasın.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <Link href="/iletisim" style={{ display: 'inline-flex', alignItems: 'center', padding: '16px 30px', borderRadius: 'var(--r-pill)', background: '#fff', color: 'var(--brand-700)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '17px', textDecoration: 'none' }}>
                    Teklif Formu
                  </Link>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', padding: '16px 30px', borderRadius: 'var(--r-pill)', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,.4)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '17px', textDecoration: 'none' }}>
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
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; padding: 56px 0 !important; }
          .about-split { grid-template-columns: 1fr !important; gap: 36px !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; gap: 20px !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
