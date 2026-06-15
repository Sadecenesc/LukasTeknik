'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface FiyatItem {
  id: string
  firma: string
  logoUrl: string
  pdfUrl: string
  pdfName: string
}

const FIXED_BRANDS = [
  'Duyar',
  'ÇayırovaBoru',
  'Vesbo Boru Sistemleri',
  'Trakya Döküm',
  'Kas',
  'SARDOĞAN',
  'Ayvaz',
  'Paktermo',
  'Grundfos',
]

function toSlug(firma: string) {
  return firma.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

function initials(firma: string) {
  return firma.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

function useVisible() {
  const [visible, setVisible] = useState(4)
  useEffect(() => {
    const update = () => {
      setVisible(window.innerWidth < 600 ? 2 : window.innerWidth < 900 ? 3 : 4)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return visible
}

export default function HomeFiyatListesi() {
  const [items, setItems] = useState<FiyatItem[]>([])
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const visible = useVisible()
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const dragStart = useRef(0)
  const isDragging = useRef(false)

  useEffect(() => {
    async function load() {
      const staticItems: FiyatItem[] = FIXED_BRANDS.map((name, i) => ({
        id: `static-${i}`,
        firma: name,
        logoUrl: '',
        pdfUrl: '',
        pdfName: '',
      }))

      if (!supabase) { setItems(staticItems); setLoading(false); return }

      const { data } = await supabase
        .from('fiyat_listesi')
        .select('*')
        .order('sira', { ascending: true })

      if (data) {
        const supabaseMap = new Map(data.map((r) => [r.firma.toLowerCase(), r]))
        setItems(staticItems.map((item) => {
          const r = supabaseMap.get(item.firma.toLowerCase())
          if (!r) return item
          return { id: r.id, firma: item.firma, logoUrl: r.logo_url ?? '', pdfUrl: r.pdf_url ?? '', pdfName: r.pdf_name ?? '' }
        }))
      } else {
        setItems(staticItems)
      }
      setLoading(false)
    }
    load()
  }, [])

  const displayItems = items.slice(0, 9)
  const maxIndex = Math.max(0, displayItems.length - visible)

  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, displayItems.length - visible)))
  }, [visible, displayItems.length])

  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), [])
  const next = useCallback(() => setIndex((i) => Math.min(maxIndex, i + 1)), [maxIndex])

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1))
    }, 3500)
  }, [maxIndex])

  useEffect(() => {
    resetAuto()
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [resetAuto])

  const cardW = 100 / visible

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid var(--brand-tint)', borderTopColor: 'var(--brand)', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--ink-soft)' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '16px' }}>Henüz fiyat listesi eklenmedi.</p>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* slider track */}
      <div
        style={{ overflow: 'hidden', cursor: isDragging.current ? 'grabbing' : 'grab', userSelect: 'none' }}
        onMouseDown={(e) => { isDragging.current = true; dragStart.current = e.clientX }}
        onMouseUp={(e) => {
          if (!isDragging.current) return
          isDragging.current = false
          const delta = dragStart.current - e.clientX
          if (delta > 50) { next(); resetAuto() }
          else if (delta < -50) { prev(); resetAuto() }
        }}
        onMouseLeave={() => { isDragging.current = false }}
      >
        <div
          style={{
            display: 'flex',
            transform: `translateX(-${index * cardW}%)`,
            transition: 'transform .42s cubic-bezier(.4,0,.2,1)',
            willChange: 'transform',
          }}
        >
          {displayItems.map((item) => (
            <div
              key={item.id}
              style={{ flex: `0 0 ${cardW}%`, padding: '0 10px', boxSizing: 'border-box' }}
            >
              <Link
                href={`/fiyat-listeleri/${toSlug(item.firma)}`}
                draggable={false}
                style={{
                  display: 'block',
                  position: 'relative',
                  aspectRatio: '4/3',
                  borderRadius: 'var(--r-lg)',
                  border: '1px solid var(--line)',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  background: '#fff',
                  transition: 'box-shadow .2s, border-color .2s, transform .2s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.boxShadow = 'var(--shadow-md)'
                  el.style.transform = 'translateY(-3px)'
                  el.style.borderColor = 'var(--brand-tint-2)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.boxShadow = ''
                  el.style.transform = ''
                  el.style.borderColor = 'var(--line)'
                }}
              >
                {/* logo / initials */}
                {item.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.logoUrl}
                    alt={item.firma}
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'contain',
                      padding: '12px',
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
                      fontSize: '36px', color: 'var(--brand-700)',
                    }}>
                      {initials(item.firma)}
                    </span>
                  </div>
                )}

                {/* bottom overlay */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '28px 14px 12px',
                  background: 'linear-gradient(transparent, rgba(255,255,255,.97))',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: '13.5px', color: 'var(--ink)',
                  }}>
                    {item.firma}
                  </span>
                  <span style={{
                    display: 'flex', alignItems: 'center', gap: '3px',
                    fontSize: '12px', color: 'var(--brand-700)',
                    fontFamily: 'var(--font-display)', fontWeight: 600,
                  }}>
                    PDF
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '11px', height: '11px' }}>
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '32px' }}>
        <button
          onClick={() => { prev(); resetAuto() }}
          disabled={index === 0}
          aria-label="Önceki"
          style={{
            width: '42px', height: '42px', borderRadius: '50%',
            border: '1.5px solid var(--line)',
            background: '#fff',
            cursor: index === 0 ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: index === 0 ? 0.35 : 1,
            transition: 'opacity .2s',
            flexShrink: 0,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px', color: 'var(--ink)' }}>
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setIndex(i); resetAuto() }}
              aria-label={`${i + 1}. slayt`}
              style={{
                width: i === index ? '24px' : '8px',
                height: '8px',
                borderRadius: '99px',
                border: 'none',
                background: i === index ? 'var(--brand)' : 'var(--line-2)',
                cursor: 'pointer',
                padding: 0,
                transition: 'width .3s cubic-bezier(.4,0,.2,1), background .3s',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => { next(); resetAuto() }}
          disabled={index === maxIndex}
          aria-label="Sonraki"
          style={{
            width: '42px', height: '42px', borderRadius: '50%',
            border: '1.5px solid var(--line)',
            background: '#fff',
            cursor: index === maxIndex ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: index === maxIndex ? 0.35 : 1,
            transition: 'opacity .2s',
            flexShrink: 0,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px', color: 'var(--ink)' }}>
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
