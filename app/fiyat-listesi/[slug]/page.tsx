'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

interface FiyatItem {
  id: string
  firma: string
  logoUrl: string
  pdfUrl: string
  pdfName: string
}

function toSlug(firma: string) {
  return firma.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

function initials(firma: string) {
  return firma.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

export default function FiyatListesiDetay() {
  const params = useParams()
  const slug = params?.slug as string
  const [item, setItem] = useState<FiyatItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!supabase) { setLoading(false); return }
      const { data } = await supabase.from('fiyat_listesi').select('*')
      if (data) {
        const found = data.find((r) => toSlug(r.firma) === slug) ?? null
        if (found) {
          setItem({
            id:      found.id,
            firma:   found.firma,
            logoUrl: found.logo_url  ?? '',
            pdfUrl:  found.pdf_url   ?? '',
            pdfName: found.pdf_name  ?? '',
          })
        }
      }
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '3px solid var(--brand-tint)',
              borderTopColor: 'var(--brand)',
              animation: 'spin 0.8s linear infinite',
            }}
          />
        </main>
        <Footer />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </>
    )
  }

  if (!item) {
    return (
      <>
        <Navbar />
        <main
          style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            padding: '80px 20px',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '28px' }}>Marka bulunamadı</h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: '17px' }}>
            Bu markaya ait fiyat listesi henüz eklenmemiş.
          </p>
          <Link
            href="/fiyat-listesi"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 24px',
              borderRadius: 'var(--r-pill)',
              background: 'var(--brand)',
              color: '#fff',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              textDecoration: 'none',
              marginTop: '8px',
            }}
          >
            Tüm Fiyat Listeleri
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Breadcrumb + header */}
        <div
          style={{
            background: 'var(--bg-soft)',
            borderBottom: '1px solid var(--line)',
            padding: '28px 0',
          }}
        >
          <div className="container">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13.5px',
                color: 'var(--ink-soft)',
                marginBottom: '20px',
              }}
            >
              <Link href="/" style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>Ana Sayfa</Link>
              <span>/</span>
              <Link href="/fiyat-listesi" style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>Fiyat Listeleri</Link>
              <span>/</span>
              <span style={{ color: 'var(--ink)' }}>{item.firma}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '14px',
                  background: '#fff',
                  border: '1px solid var(--line)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                {item.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.logoUrl}
                    alt={item.firma}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }}
                  />
                ) : (
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: 'var(--brand-700)' }}>
                    {initials(item.firma)}
                  </span>
                )}
              </div>
              <div>
                <h1
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(22px,3vw,30px)',
                    color: 'var(--ink)',
                    lineHeight: 1.15,
                  }}
                >
                  {item.firma} Fiyat Listesi
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <section className="section">
          <div className="container">
            {item.pdfUrl ? (
              <div
                style={{
                  borderRadius: 'var(--r-lg)',
                  overflow: 'hidden',
                  border: '1px solid var(--line)',
                  boxShadow: 'var(--shadow)',
                  background: '#fff',
                }}
              >
                {/* Toolbar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 20px',
                    borderBottom: '1px solid var(--line)',
                    background: 'var(--bg-soft)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px', color: 'var(--ink)' }}>
                    {item.firma} — Güncel Fiyat Listesi
                    {item.pdfName && <span style={{ fontWeight: 400, color: 'var(--ink-soft)', marginLeft: '8px', fontSize: '13px' }}>({item.pdfName})</span>}
                  </span>
                  <a
                    href={item.pdfUrl}
                    download={item.pdfName || `${item.firma}-fiyat-listesi.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '8px 18px', borderRadius: 'var(--r-sm)',
                      background: 'var(--brand)', color: '#fff',
                      fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13.5px',
                      textDecoration: 'none',
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    PDF İndir
                  </a>
                </div>

                {/* Desktop: iframe */}
                <iframe
                  className="pdf-iframe"
                  src={`${item.pdfUrl}#toolbar=1&navpanes=0`}
                  style={{ width: '100%', height: '80vh', minHeight: '600px', border: 'none', display: 'block' }}
                  title={`${item.firma} Fiyat Listesi`}
                />

                {/* Mobil: indirme kartı */}
                <div className="pdf-mobile-fallback" style={{
                  display: 'none',
                  flexDirection: 'column', alignItems: 'center', gap: '16px',
                  padding: '48px 24px', textAlign: 'center',
                  background: 'var(--bg-soft)', borderRadius: 'var(--r-lg)',
                  border: '1px solid var(--line)',
                }}>
                  <div style={{ fontSize: '48px' }}>📄</div>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '17px', color: 'var(--ink)' }}>
                    PDF&apos;i görüntülemek için indirin
                  </p>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '14.5px' }}>
                    Mobil tarayıcılar PDF&apos;i doğrudan gösteremeyebilir.
                  </p>
                  <a
                    href={item.pdfUrl}
                    download={item.pdfName || `${item.firma}-fiyat-listesi.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '14px 28px', borderRadius: 'var(--r-pill)',
                      background: 'var(--brand)', color: '#fff',
                      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px',
                      textDecoration: 'none',
                    }}
                  >
                    PDF İndir / Aç
                  </a>
                </div>
              </div>
            ) : (
              <div
                style={{
                  background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)',
                  padding: '72px 40px', textAlign: 'center',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
                }}
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--brand-tint)', display: 'grid', placeItems: 'center', color: 'var(--brand-700)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px' }}>PDF henüz yüklenmedi</h2>
                <p style={{ color: 'var(--ink-soft)', fontSize: '16px', maxWidth: '480px', lineHeight: 1.6 }}>
                  {item.firma} için güncel fiyat listesi PDF&apos;i yakında eklenecektir.
                  Fiyat bilgisi için bizimle iletişime geçin.
                </p>
                <Link
                  href="/iletisim"
                  style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', borderRadius: 'var(--r-pill)', background: 'var(--brand)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '16px', textDecoration: 'none', marginTop: '8px' }}
                >
                  Fiyat Teklifi Al
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .pdf-iframe          { display: none !important; }
          .pdf-mobile-fallback { display: flex !important; }
        }
      `}</style>
    </>
  )
}
