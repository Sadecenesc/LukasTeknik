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
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
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
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
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
