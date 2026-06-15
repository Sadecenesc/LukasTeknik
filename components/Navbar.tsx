'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const SITE = {
  phone: '0505 699 52 45',
  phoneHref: 'tel:+905056995245',
  whatsapp: '905056995245',
  waMsg: 'Merhaba, ürün ve fiyat bilgisi almak istiyorum.',
}

const MENU = [
  { id: 'anasayfa', label: 'Ana Sayfa', href: '/' },
  { id: 'hakkimizda', label: 'Hakkımızda', href: '/hakkimizda' },
  { id: 'fiyat', label: 'Fiyat Listeleri', href: '/fiyat-listeleri' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'iletisim', label: 'İletişim', href: '/iletisim' },
]

function waLink() {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.waMsg)}`
}

export default function Navbar() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)
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

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const socialIconBtn: React.CSSProperties = {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    background: 'var(--brand-tint)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--brand-700)',
    textDecoration: 'none',
    flexShrink: 0,
    transition: 'background .2s',
  }

  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 100, height: 'var(--nav-h)', background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" aria-label="Lukas Teknik">
            <Image src="/assets/logo.webp" alt="Lukas Teknik" width={140} height={40} style={{ objectFit: 'contain', height: '40px', width: 'auto' }} priority />
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="nav-desktop">
            {MENU.map((m) => (
              <Link
                key={m.id}
                href={m.href}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: isActive(m.href) ? 600 : 500,
                  fontSize: '14.5px',
                  color: isActive(m.href) ? 'var(--brand-700)' : 'var(--ink-soft)',
                  padding: '6px 12px',
                  borderRadius: 'var(--r-sm)',
                  textDecoration: 'none',
                  background: isActive(m.href) ? 'var(--brand-tint)' : 'transparent',
                  transition: 'all .2s',
                }}
              >
                {m.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Telefon */}
            <a
              href={SITE.phoneHref}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--ink)' }}
              className="nav-phone"
            >
              <span style={{ display: 'flex', width: '36px', height: '36px', background: 'var(--brand-tint)', borderRadius: '50%', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-700)', flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span style={{ lineHeight: 1.2 }}>
                <small style={{ display: 'block', fontSize: '11px', color: 'var(--ink-faint)', fontFamily: 'var(--font-display)' }}>Hemen arayın</small>
                <strong style={{ fontSize: '14px', fontFamily: 'var(--font-display)' }}>{SITE.phone}</strong>
              </span>
            </a>

            <Link href="/iletisim" className="btn btn-primary nav-cta">
              Teklif Al
            </Link>

            {/* Sosyal ikonlar — desktop */}
            <div className="nav-social" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {/* WhatsApp */}
              <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={socialIconBtn}>
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px' }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href={instagram || '#'} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={socialIconBtn}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href={linkedin || '#'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={socialIconBtn}>
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '15px', height: '15px' }}>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>

            {/* Hamburger */}
            <button
              className="hamburger"
              aria-label="Menü"
              onClick={() => setDrawerOpen(true)}
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--ink)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: '24px', height: '24px' }}>
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer backdrop */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 200, backdropFilter: 'blur(4px)' }}
        />
      )}

      {/* Mobile drawer */}
      <aside
        style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0,
          width: '300px',
          background: '#fff',
          zIndex: 201,
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform .3s ease',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <Image src="/assets/logo.webp" alt="Lukas Teknik" width={120} height={36} style={{ objectFit: 'contain' }} />
          <button onClick={() => setDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--ink)' }} aria-label="Kapat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: '24px', height: '24px' }}>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '4px' }}>
          {MENU.map((m) => (
            <Link
              key={m.id}
              href={m.href}
              onClick={() => setDrawerOpen(false)}
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--r-sm)',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '15px',
                color: isActive(m.href) ? 'var(--brand-700)' : 'var(--ink)',
                background: isActive(m.href) ? 'var(--brand-tint)' : 'transparent',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {m.label}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '24px' }}>
          <Link href="/iletisim" className="btn btn-primary" style={{ justifyContent: 'center' }} onClick={() => setDrawerOpen(false)}>
            Teklif Al
          </Link>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setDrawerOpen(false)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 26px', borderRadius: 'var(--r-pill)', background: '#25d366', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px', textDecoration: 'none' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px' }}>
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm4.76 13.73c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.59.13-.17.26-.67.85-.83 1.03-.15.17-.3.2-.56.07-.26-.13-1.1-.41-2.1-1.29-.78-.69-1.3-1.55-1.45-1.81-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.59-1.42-.81-1.94-.21-.51-.43-.44-.59-.45l-.5-.01c-.17 0-.46.06-.7.33-.24.26-.92.9-.92 2.19 0 1.29.94 2.53 1.07 2.71.13.17 1.85 2.83 4.48 3.96.63.27 1.11.43 1.49.55.63.2 1.2.17 1.65.1.5-.07 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.06-.11-.23-.17-.49-.3z" />
            </svg>
            WhatsApp&apos;ten iletişime geç
          </a>
          <a href={SITE.phoneHref} className="btn btn-outline" style={{ justifyContent: 'center' }}>
            {SITE.phone}
          </a>
          {/* Sosyal ikonlar — mobile drawer */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', paddingTop: '8px' }}>
            <a href={instagram || '#'} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--brand-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-700)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '17px', height: '17px' }}>
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href={linkedin || '#'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--brand-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-700)' }}>
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '17px', height: '17px' }}>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </aside>

      <style>{`
        @media (max-width: 1100px) {
          .nav-social { display: none !important; }
        }
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-phone { display: none !important; }
          .nav-cta { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
