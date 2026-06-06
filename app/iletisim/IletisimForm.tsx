'use client'

import { useState } from 'react'

const SITE = {
  phone:     '0505 699 52 45',
  phoneHref: 'tel:+905056995245',
  waDefault: '905056995245',
  waMsg:     'Merhaba, ürün ve fiyat bilgisi almak istiyorum.',
  email:     'info@lukasteknik.com',
  hours:     'Pzt–Cmt 08:30 – 18:30',
}

const INFO_CARDS = [
  {
    title: 'Adres',
    value: 'Siyavuşpaşa, Köprübaşı Sk. No:29/A,\n34182 Bahçelievler/İstanbul',
    href: 'https://maps.google.com/?q=Siyavuşpaşa+Köprübaşı+Sk+No+29+A+Bahçelievler+İstanbul',
    sub: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: 'Telefon',
    value: SITE.phone,
    href: SITE.phoneHref,
    sub: SITE.hours,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: 'E-posta',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    sub: 'Teklif: teklif@lukasteknik.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" />
      </svg>
    ),
  },
]

const TIPS = [
  'Aradığınız ürün veya sistem tipi',
  'Adet / miktar bilgisi',
  'Proje yeri veya teslim tarihi',
]

export default function IletisimForm() {
  const waLink = `https://wa.me/${SITE.waDefault}?text=${encodeURIComponent(SITE.waMsg)}`

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '54px', alignItems: 'start' }} className="contact-layout">

      {/* Info cards */}
      <div>
        <span className="section-label">Bize Ulaşın</span>
        <h2 className="h2" style={{ marginTop: '16px', fontSize: '30px' }}>İletişim bilgileri</h2>
        <div style={{ marginTop: '24px' }}>
          {INFO_CARDS.map((c) => (
            <div key={c.title} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '22px 0', borderBottom: '1px solid var(--line)' }}>
              <span style={{ width: '50px', height: '50px', borderRadius: '13px', background: 'var(--brand-tint)', color: 'var(--brand-700)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                {c.icon}
              </span>
              <div>
                <h4 style={{ fontSize: '13px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-faint)', fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '6px' }}>{c.title}</h4>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '17px', color: 'var(--ink)', lineHeight: 1.4, whiteSpace: 'pre-line' }}>
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {c.value}
                  </a>
                </div>
                {c.sub && <div style={{ fontSize: '14px', color: 'var(--ink-soft)', marginTop: '3px' }}>{c.sub}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: '38px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '0' }}>

        {/* WA icon + header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: '#e8f8ee', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <svg viewBox="0 0 24 24" fill="#25D366" style={{ width: '34px', height: '34px' }}>
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm-.01 1.8c2.32 0 4.49.9 6.13 2.54a8.14 8.14 0 0 1 2.4 5.57c0 4.55-3.7 8.25-8.25 8.25a8.21 8.21 0 0 1-4.04-1.07l-.29-.17-3.01.79.8-2.93-.19-.3a8.19 8.19 0 0 1-1.26-4.37c.01-4.55 3.71-8.31 8.71-8.31zm-2.1 4.5c-.19 0-.48.07-.73.35-.25.27-.96.94-.96 2.28s.98 2.65 1.12 2.83c.13.19 1.91 2.92 4.63 3.98.65.28 1.15.45 1.54.57.65.2 1.24.17 1.71.1.52-.08 1.6-.65 1.83-1.29.22-.63.22-1.17.16-1.29-.07-.11-.25-.18-.53-.31-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.85 1.06-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.15-.27-.02-.41.12-.54.12-.12.27-.31.41-.47.13-.16.17-.27.27-.45.09-.18.04-.34-.02-.47-.07-.14-.61-1.47-.84-2.01-.22-.53-.44-.45-.61-.46l-.52-.01z" />
            </svg>
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2 }}>
              WhatsApp&apos;tan anında yazın
            </h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: '15px', marginTop: '4px' }}>
              Mesai saatleri içinde dakikalar içinde yanıt veriyoruz.
            </p>
          </div>
        </div>

        {/* Main WA button */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
            padding: '18px 30px',
            borderRadius: 'var(--r-pill)',
            background: '#25D366',
            color: '#fff',
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px',
            textDecoration: 'none',
            marginTop: '8px',
            transition: 'background .18s, transform .18s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = '#1ebe5b'
            ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = '#25D366'
            ;(e.currentTarget as HTMLAnchorElement).style.transform = ''
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '22px', height: '22px', flexShrink: 0 }}>
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z" />
          </svg>
          WhatsApp&apos;tan İletişime Geçin
        </a>

        {/* Phone fallback */}
        <a
          href={SITE.phoneHref}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            marginTop: '14px',
            padding: '14px 24px',
            borderRadius: 'var(--r-pill)',
            border: '1.5px solid var(--line-2)',
            background: 'transparent',
            color: 'var(--ink)',
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '16px',
            textDecoration: 'none',
            transition: 'border-color .18s, background .18s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--brand-tint-2)'
            ;(e.currentTarget as HTMLAnchorElement).style.background = 'var(--bg-soft)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--line-2)'
            ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px', color: 'var(--ink-soft)' }}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {SITE.phone}
        </a>

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--line)', margin: '28px 0 22px' }} />

        {/* Tips */}
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px', color: 'var(--ink-2)', marginBottom: '14px', letterSpacing: '.01em' }}>
            Hızlı yanıt için mesajınıza şunları ekleyin:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {TIPS.map((tip) => (
              <div key={tip} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#e8f8ee', color: '#25D366', display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: '1px' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '13px', height: '13px' }}>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.5 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hours note */}
        <div style={{ marginTop: '22px', padding: '14px 16px', background: 'var(--bg-soft)', borderRadius: 'var(--r-sm)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px', color: 'var(--ink-faint)', flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
          </svg>
          <span style={{ fontSize: '13.5px', color: 'var(--ink-soft)', fontFamily: 'var(--font-display)', fontWeight: 500 }}>
            Çalışma saatleri: <strong style={{ color: 'var(--ink)' }}>{SITE.hours}</strong>
          </span>
        </div>
      </div>
    </div>
  )
}
