'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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

export default function FiyatListesi() {
  const [items, setItems] = useState<FiyatItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!supabase) { setLoading(false); return }
      const { data } = await supabase
        .from('fiyat_listesi')
        .select('*')
        .order('sira', { ascending: true })
      if (data) {
        setItems(data.map((r) => ({
          id:       r.id,
          firma:    r.firma,
          logoUrl:  r.logo_url  ?? '',
          pdfUrl:   r.pdf_url   ?? '',
          pdfName:  r.pdf_name  ?? '',
        })))
      }
      setLoading(false)
    }
    load()
  }, [])

  return (
    <>
      <style>{`
        .fiyat-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
          margin-bottom: 56px;
        }
        @media (max-width: 900px) {
          .fiyat-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 480px) {
          .fiyat-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* Grid header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <p style={{ fontSize: '15px', color: 'var(--ink-soft)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '17px', color: 'var(--ink)' }}>{items.length}</span>
          marka · güncel PDF fiyat listeleri
        </p>
        <span style={{ fontSize: '13.5px', color: 'var(--ink-faint)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
            <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
          </svg>
          Düzenli güncellenir
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid var(--brand-tint)', borderTopColor: 'var(--brand)', animation: 'spin 0.8s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      )}

      {/* Empty state */}
      {!loading && items.length === 0 && (
        <div style={{ textAlign: 'center', padding: '64px 20px', color: 'var(--ink-soft)' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '17px', marginBottom: '8px' }}>Henüz fiyat listesi eklenmedi</p>
          <p style={{ fontSize: '14px' }}>Admin panelinden fiyat listesi ekleyebilirsiniz.</p>
        </div>
      )}

      {/* Brand grid */}
      {!loading && items.length > 0 && (
        <div className="fiyat-grid">
          {items.map((item) => (
            <BrandCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* CTA */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--brand-deep) 0%, var(--brand-700) 100%)',
          borderRadius: '24px',
          padding: '52px 60px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', right: '-60px', top: '-60px', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(255,255,255,.06)' }} />
        <div style={{ position: 'absolute', right: '60px', bottom: '-80px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,.04)' }} />

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '36px', flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', display: 'block', marginBottom: '12px' }}>
              Aradığınızı bulamadınız mı?
            </span>
            <h2 style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(22px,3.2vw,32px)', lineHeight: 1.2, textTransform: 'none' }}>
              Listede olmayan marka için<br />net teklif alın
            </h2>
            <p style={{ color: 'rgba(255,255,255,.7)', marginTop: '12px', fontSize: '16px', lineHeight: 1.6 }}>
              Adetli listenizde iskontolu net fiyat için ekibimizle iletişime geçin.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0 }}>
            <Link
              href="/iletisim"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '15px 30px',
                borderRadius: 'var(--r-pill)',
                background: '#fff',
                color: 'var(--brand-700)',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              Teklif Al
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

function BrandCard({ item }: { item: FiyatItem }) {
  return (
    <Link
      href={`/fiyat-listeleri/${toSlug(item.firma)}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        border: '1px solid var(--line)',
        borderRadius: 'var(--r)',
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'box-shadow .2s, transform .2s, border-color .2s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.boxShadow = 'var(--shadow-md)'
        el.style.transform = 'translateY(-2px)'
        el.style.borderColor = 'var(--brand-tint-2)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.boxShadow = ''
        el.style.transform = ''
        el.style.borderColor = 'var(--line)'
      }}
    >
      {/* Logo area */}
      <div style={{
        position: 'relative',
        aspectRatio: '3/2',
        background: '#fff',
        overflow: 'hidden',
        borderBottom: '1px solid var(--line)',
      }}>
        {item.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.logoUrl}
            alt={item.firma}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'contain',
              padding: '8px',
              boxSizing: 'border-box',
              mixBlendMode: 'multiply',
            }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: '24px', color: 'var(--brand-700)',
              letterSpacing: '-.02em',
            }}>
              {initials(item.firma)}
            </span>
          </div>
        )}

        {item.pdfName ? (
          <span style={{
            position: 'absolute', top: '6px', right: '6px',
            background: 'var(--brand)', color: '#fff',
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '9px',
            padding: '2px 7px', borderRadius: '99px',
            letterSpacing: '.04em',
          }}>
            PDF
          </span>
        ) : (
          <span style={{
            position: 'absolute', top: '6px', right: '6px',
            background: 'var(--line-2)', color: 'var(--ink-faint)',
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '9px',
            padding: '2px 7px', borderRadius: '99px',
          }}>
            Yakında
          </span>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: '8px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '4px',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: '11.5px', color: 'var(--ink)',
          lineHeight: 1.25,
        }}>
          {item.firma}
        </span>
        <span style={{
          display: 'flex', alignItems: 'center', gap: '2px',
          fontSize: '10px', color: 'var(--brand-700)',
          fontFamily: 'var(--font-display)', fontWeight: 600,
          flexShrink: 0,
        }}>
          İncele
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '10px', height: '10px' }}>
            <path d="m9 18 6-6-6-6" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
