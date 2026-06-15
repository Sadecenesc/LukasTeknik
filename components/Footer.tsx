'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const SITE = {
  phone: '0505 699 52 45',
  phoneHref: 'tel:+905056995245',
  whatsapp: '905056995245',
  waMsg: 'Merhaba, ürün ve fiyat bilgisi almak istiyorum.',
  email: 'info@lukasteknik.com',
  address: 'Siyavuşpaşa, Köprübaşı Sk. No:29/A, 34182 Bahçelievler/İstanbul',
  hours: 'Pzt–Cmt 08:30 – 18:30',
}

const MENU = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'Fiyat Listeleri', href: '/fiyat-listeleri' },
  { label: 'Blog', href: '/blog' },
  { label: 'İletişim', href: '/iletisim' },
]

const SOLUTIONS = [
  { label: 'Yangın Söndürme Sistemleri', href: '/fiyat-listeleri' },
  { label: 'Pompa & Hidrofor Sistemleri', href: '/fiyat-listeleri' },
  { label: 'Vana & Bağlantı Elemanları', href: '/fiyat-listeleri' },
  { label: 'Kazan & Isıtma Sistemleri', href: '/fiyat-listeleri' },
  { label: 'İklimlendirme & Soğutma', href: '/fiyat-listeleri' },
  { label: 'Proje Danışmanlığı', href: '/iletisim' },
]

const iconBase: React.CSSProperties = {
  width: '38px',
  height: '38px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(255,255,255,.8)',
  transition: 'background .2s',
  textDecoration: 'none',
  flexShrink: 0,
}

function waLink() {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.waMsg)}`
}

export default function Footer() {
  const [instagram, setInstagram] = useState('')
  const [linkedin, setLinkedin] = useState('')

  useEffect(() => {
    async function load() {
      if (!supabase) return
      const { data } = await supabase.from('site_settings').select('key, value')
      if (data) {
        const map = Object.fromEntries(data.map((r) => [r.key, r.value]))
        if (map.instagram) setInstagram(map.instagram)
        if (map.linkedin)  setLinkedin(map.linkedin)
      }
    }
    load()
  }, [])

  return (
    <footer style={{ background: 'var(--ink)', color: 'rgba(255,255,255,.6)', paddingTop: '64px', paddingBottom: '32px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '64px' }}>

          {/* Brand column */}
          <div>
            <div style={{ marginBottom: '20px', lineHeight: 0 }}>
              <div style={{ display: 'inline-flex', background: '#fff', padding: '8px 14px', borderRadius: '8px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/logo.webp"
                  alt="Lukas Teknik"
                  style={{ height: '36px', width: 'auto', objectFit: 'contain', display: 'block' }}
                />
              </div>
            </div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.7, marginBottom: '24px' }}>
              Mekanik tesisat ve endüstriyel sistemlerde güvenilir çözüm ortağınız.
            </p>

            {/* Sosyal ikonlar */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {/* WhatsApp */}
              <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={iconBase}>
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px' }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </a>

              {/* Instagram */}
              <a href={instagram || '#'} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={iconBase}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a href={linkedin || '#'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={iconBase}>
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px' }}>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: '20px' }}>
              Sayfalar
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {MENU.map((m) => (
                <Link key={m.href} href={m.href} style={{ color: 'rgba(255,255,255,.6)', textDecoration: 'none', fontSize: '14.5px', transition: 'color .2s' }}>
                  {m.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Solutions */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: '20px' }}>
              Çözümlerimiz
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SOLUTIONS.map((s) => (
                <Link key={s.label} href={s.href} style={{ color: 'rgba(255,255,255,.6)', textDecoration: 'none', fontSize: '14.5px', transition: 'color .2s' }}>
                  {s.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: '20px' }}>
              İletişim
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: SITE.phone, href: SITE.phoneHref, icon: 'phone' },
                { label: SITE.email, href: `mailto:${SITE.email}`, icon: 'mail' },
                { label: SITE.address, href: '#', icon: 'pin' },
                { label: SITE.hours, href: '#', icon: 'clock' },
              ].map(({ label, href, icon }) => (
                <a key={label} href={href} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: 'rgba(255,255,255,.6)', textDecoration: 'none', fontSize: '14px', lineHeight: 1.5 }}>
                  <span style={{ flexShrink: 0, marginTop: '2px' }}>
                    {icon === 'phone' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    )}
                    {icon === 'mail' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
                        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" />
                      </svg>
                    )}
                    {icon === 'pin' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                    )}
                    {icon === 'clock' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
                        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                      </svg>
                    )}
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: '28px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', alignItems: 'center', fontSize: '13.5px' }}>
          <span>© {new Date().getFullYear()} Lukas Teknik. Tüm hakları saklıdır.</span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/gizlilik" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Gizlilik Politikası</Link>
            <Link href="/kvkk" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>KVKK</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
