'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

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
  { label: 'Fiyat Listesi', href: '/fiyat-listesi' },
  { label: 'Blog', href: '/blog' },
  { label: 'İletişim', href: '/iletisim' },
]

const SOLUTIONS = [
  { label: 'Yangın Söndürme Sistemleri', href: '/fiyat-listesi' },
  { label: 'Pompa & Hidrofor Sistemleri', href: '/fiyat-listesi' },
  { label: 'Vana & Bağlantı Elemanları', href: '/fiyat-listesi' },
  { label: 'Kazan & Isıtma Sistemleri', href: '/fiyat-listesi' },
  { label: 'İklimlendirme & Soğutma', href: '/fiyat-listesi' },
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

export default function Footer() {
  const [social, setSocial] = useState({
    instagram: '',
    linkedin: '',
    whatsapp: `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.waMsg)}`,
  })

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lukas_social_links')
      const parsed = saved ? JSON.parse(saved) : {}
      localStorage.setItem('lukas_social_links', JSON.stringify({ ...parsed, whatsapp: SITE.whatsapp }))
      setSocial({
        instagram: parsed.instagram || '',
        linkedin: parsed.linkedin || '',
        whatsapp: `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.waMsg)}`,
      })
    } catch {}
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
              <a href={social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={iconBase}>
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px' }}>
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm4.76 13.73c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.59.13-.17.26-.67.85-.83 1.03-.15.17-.3.2-.56.07-.26-.13-1.1-.41-2.1-1.29-.78-.69-1.3-1.55-1.45-1.81-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.59-1.42-.81-1.94-.21-.51-.43-.44-.59-.45l-.5-.01c-.17 0-.46.06-.7.33-.24.26-.92.9-.92 2.19 0 1.29.94 2.53 1.07 2.71.13.17 1.85 2.83 4.48 3.96.63.27 1.11.43 1.49.55.63.2 1.2.17 1.65.1.5-.07 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.06-.11-.23-.17-.49-.3z" />
                </svg>
              </a>

              {/* Instagram */}
              <a href={social.instagram || '#'} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={iconBase}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a href={social.linkedin || '#'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={iconBase}>
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
