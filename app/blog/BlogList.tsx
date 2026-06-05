'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Post {
  slug: string
  cat: string
  title: string
  date: string
  readTime: string
  excerpt: string
  img: string
}

const STATIC_POSTS: Post[] = [
  {
    slug: 'hidrofor-grubu-boyutlandirma',
    cat: 'Teknik Rehber',
    title: 'Hidrofor Grubu Boyutlandırma Rehberi',
    date: '4 Haz 2026',
    readTime: '7 dk',
    excerpt: 'Hidrofor grubu seçiminde doğru debi, basınç ve tank hacmi hesabı — adım adım boyutlandırma kılavuzu.',
    img: '/assets/ımages/A_blue_ductile_iron_flanged_202606042012.jpeg',
  },
  {
    slug: 'tse-ce-belgelendirme',
    cat: 'Teknik Rehber',
    title: 'TSE ve CE Belgelendirmesi: Mekanik Tesisat Ürünlerinde Önemi',
    date: '4 Haz 2026',
    readTime: '6 dk',
    excerpt: 'Mekanik tesisat ürünlerinde TSE belgesi ve CE işaretinin ne anlama geldiği, neden zorunlu olduğu ve nasıl sorgulandığı.',
    img: '/assets/ımages/vana.png',
  },
  {
    slug: 'vana-tipleri-rehberi',
    cat: 'Teknik Rehber',
    title: 'Vana tipleri ve doğru uygulama alanları rehberi',
    date: '28 Nis 2026',
    readTime: '8 dk',
    excerpt: 'Küresel, kelebek, çekvalf ve kontrol vanalarının farkları ve hangi uygulamada hangisi kullanılmalı.',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=640&q=80&fit=crop',
  },
  {
    slug: 'enerji-verimli-isitma-iptiplari',
    cat: 'Isıtma & Soğutma',
    title: 'Enerji verimli ısıtma sistemleri için 7 ipucu',
    date: '15 Nis 2026',
    readTime: '5 dk',
    excerpt: 'Kazan dairesinden kollektör grubuna, enerji maliyetini düşüren pratik uygulamalar.',
    img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=640&q=80&fit=crop',
  },
  {
    slug: 'sprinkler-tasarim-kurallari',
    cat: 'Yangın Sistemleri',
    title: 'Sprinkler sistemi tasarımında temel kurallar',
    date: '2 Nis 2026',
    readTime: '7 dk',
    excerpt: 'Bina tipine göre sprinkler yerleşimi, alan hesabı ve yönetmelik gereklilikleri.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&q=80&fit=crop',
  },
  {
    slug: 'endustriyel-pompa-bakimi',
    cat: 'Endüstriyel',
    title: 'Endüstriyel pompa bakımında dikkat edilecekler',
    date: '21 Mar 2026',
    readTime: '6 dk',
    excerpt: 'Pompa ömrünü uzatan periyodik bakım adımları ve sık yapılan hatalar.',
    img: '/assets/ımages/Close-up_of_the_green_and_202606042054.webp',
  },
  {
    slug: 'malzeme-secimi-nasil-yapilir',
    cat: 'Teknik Rehber',
    title: 'Mekanik tesisatta malzeme seçimi nasıl yapılır?',
    date: '8 Mar 2026',
    readTime: '9 dk',
    excerpt: 'Proje şartnamesine uygun, sertifikalı ve uyumlu malzeme seçiminin püf noktaları.',
    img: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=640&q=80&fit=crop',
  },
  {
    slug: 'fan-coil-vs-klima-santrali',
    cat: 'Isıtma & Soğutma',
    title: 'Fan-coil mi, klima santrali mi? Karşılaştırma',
    date: '24 Şub 2026',
    readTime: '6 dk',
    excerpt: 'İki sistemin avantajları, maliyetleri ve hangi projede hangisinin tercih edilmesi gerektiği.',
    img: 'https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=640&q=80&fit=crop',
  },
]

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1698031610493-c19fa20dfeab?w=640&q=80&fit=crop'

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  return `${Math.max(1, Math.round(words / 200))} dk`
}

export default function BlogList() {
  const [active, setActive] = useState('Tümü')
  const [adminPosts, setAdminPosts] = useState<Post[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lukas_blog_items')
      if (!stored) return
      const items: Record<string, unknown>[] = JSON.parse(stored)
      const str = (v: unknown, fb = '') => (typeof v === 'string' ? v : fb)
      const published: Post[] = items
        .filter((item) => item.status === 'Yayında' && item.slug)
        .map((item) => ({
          slug: str(item.slug),
          cat: str(item.cat, 'Genel'),
          title: str(item.title, 'Başlıksız'),
          date: str(item.date),
          readTime: estimateReadTime(str(item.content)),
          excerpt: str(item.excerpt),
          img: str(item.coverImageUrl, FALLBACK_IMG),
        }))
      setAdminPosts(published)
    } catch {}
  }, [])

  const allPosts = [...adminPosts, ...STATIC_POSTS]
  const dynamicCats = adminPosts.map((p) => p.cat).filter(Boolean)
  const cats = ['Tümü', 'Yangın Sistemleri', 'Isıtma & Soğutma', 'Teknik Rehber', 'Endüstriyel', ...dynamicCats.filter((c) => !['Yangın Sistemleri', 'Isıtma & Soğutma', 'Teknik Rehber', 'Endüstriyel'].includes(c))]
  const uniqueCats = Array.from(new Set(cats))

  const filtered = active === 'Tümü' ? allPosts : allPosts.filter((p) => p.cat === active)

  return (
    <>
      {/* Featured post */}
      <Link href="/blog/yangin-pompasi-secimi" style={{ display: 'grid', gridTemplateColumns: '1.15fr .85fr', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', overflow: 'hidden', background: '#fff', textDecoration: 'none', transition: 'box-shadow .25s', marginBottom: '44px' }} className="feat-post">
        <div style={{ minHeight: '360px', position: 'relative', overflow: 'hidden' }}>
          <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&fit=crop" alt="Yangın pompası" fill style={{ objectFit: 'cover' }} sizes="50vw" />
        </div>
        <div style={{ padding: '42px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
          <div>
            <span style={{ display: 'inline-block', padding: '4px 11px', background: 'var(--ember-tint)', color: 'var(--ember)', borderRadius: 'var(--r-pill)', fontSize: '12px', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Yangın Sistemleri</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3vw,34px)', lineHeight: 1.15, color: 'var(--ink)' }}>
            Yangın pompası seçiminde dikkat edilmesi gereken 5 kriter
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: '16.5px', lineHeight: 1.6 }}>
            Doğru debi ve basınç hesabından sertifika uyumuna, yangın pompası seçerken atlanmaması gereken teknik kriterleri derledik.
          </p>
          <div style={{ fontSize: '13.5px', color: 'var(--ink-faint)', fontFamily: 'var(--font-display)', fontWeight: 500 }}>
            12 Mayıs 2026 · 6 dk okuma · <span style={{ color: 'var(--brand-700)' }}>Yazıyı oku →</span>
          </div>
        </div>
      </Link>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '30px' }}>
        {uniqueCats.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            style={{
              padding: '10px 18px', borderRadius: 'var(--r-pill)', border: '1px solid', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '14px', cursor: 'pointer', transition: 'all .18s',
              borderColor: active === c ? 'var(--brand)' : 'var(--line-2)',
              background: active === c ? 'var(--brand)' : '#fff',
              color: active === c ? '#fff' : 'var(--ink-2)',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '26px' }} className="blog-grid">
        {filtered.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ aspectRatio: '16/10', position: 'relative', overflow: 'hidden' }}>
              <Image
                src={p.img}
                alt={p.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 900px) 100vw, 33vw"
                unoptimized={p.img.startsWith('data:')}
              />
            </div>
            <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <div>
                <span style={{ display: 'inline-block', padding: '4px 11px', background: 'var(--brand-tint)', color: 'var(--brand-700)', borderRadius: 'var(--r-pill)', fontSize: '12px', fontFamily: 'var(--font-display)', fontWeight: 600 }}>{p.cat}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '19px', lineHeight: 1.28 }}>{p.title}</h3>
              <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>{p.excerpt}</p>
              <div style={{ fontSize: '13px', color: 'var(--ink-faint)', fontFamily: 'var(--font-display)', fontWeight: 500 }}>{p.date} · {p.readTime} okuma</div>
              <span style={{ marginTop: 'auto', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px', color: 'var(--brand-700)' }}>Yazıyı oku →</span>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .feat-post:hover { box-shadow: var(--shadow); }
        @media (max-width: 900px) {
          .feat-post { grid-template-columns: 1fr !important; }
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
