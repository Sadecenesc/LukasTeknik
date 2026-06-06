'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

interface AdminPost {
  id: string
  slug: string
  title: string
  cat: string
  date: string
  status: string
  content: string
  excerpt: string
  coverImageUrl: string
  tags?: string
}

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  return `${Math.max(1, Math.round(words / 200))} dk`
}

function renderContent(content: string) {
  return content
    .split(/\n{2,}|\n/)
    .filter((p) => p.trim())
    .map((para, i) => {
      const headingMatch = para.match(/^\*\*(.+?)\*\*(.*)/)
      if (headingMatch) {
        return (
          <div key={i} style={{ marginBottom: '28px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '19px', color: 'var(--ink)', marginBottom: '10px' }}>
              {headingMatch[1]}
            </h3>
            {headingMatch[2].trim() && (
              <p style={{ fontSize: '16.5px', lineHeight: 1.75, color: 'var(--ink-soft)' }}>{headingMatch[2].trim()}</p>
            )}
          </div>
        )
      }
      return (
        <p key={i} style={{ fontSize: '16.5px', lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: '22px' }}>
          {para.replace(/\*\*/g, '')}
        </p>
      )
    })
}

export default function DynamicBlogPost({ slug }: { slug: string }) {
  const [post, setPost] = useState<AdminPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPost() {
      if (!supabase) { setLoading(false); return }
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single()
      if (data) {
        setPost({
          id: data.id,
          slug: data.slug,
          title: data.title,
          cat: data.category || 'Genel',
          date: data.date || '',
          status: data.status,
          content: data.content || '',
          excerpt: data.excerpt || '',
          coverImageUrl: data.cover_url || '',
          tags: data.tags || '',
        })
      }
      setLoading(false)
    }
    loadPost()
  }, [slug])

  if (loading) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: 'var(--ink-faint)', fontFamily: 'var(--font-display)', fontSize: '16px' }}>Yükleniyor…</div>
        </main>
        <Footer />
      </>
    )
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', textAlign: 'center', padding: '40px 24px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px,5vw,52px)', color: 'var(--ink)' }}>Yazı bulunamadı</h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: '18px' }}>Aradığınız blog yazısı mevcut değil veya kaldırılmış olabilir.</p>
          <Link href="/blog" className="btn btn-primary">← Blog&apos;a Dön</Link>
        </main>
        <Footer />
      </>
    )
  }

  const readTime = estimateReadTime(post.content)
  const hasImage = !!post.coverImageUrl

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <div style={{ background: 'var(--bg-soft)', borderBottom: '1px solid var(--line)', padding: '36px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--ink-faint)', fontFamily: 'var(--font-display)', marginBottom: '24px' }}>
              <Link href="/" style={{ color: 'var(--ink-faint)', textDecoration: 'none' }}>Ana Sayfa</Link>
              <span>/</span>
              <Link href="/blog" style={{ color: 'var(--ink-faint)', textDecoration: 'none' }}>Blog</Link>
              <span>/</span>
              <span style={{ color: 'var(--ink-soft)' }}>{post.cat}</span>
            </div>
            <span style={{ display: 'inline-block', padding: '4px 12px', background: 'var(--brand-tint)', color: 'var(--brand-700)', borderRadius: 'var(--r-pill)', fontSize: '12px', fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '16px' }}>
              {post.cat}
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px,4vw,44px)', letterSpacing: '-.02em', lineHeight: 1.1, maxWidth: '780px', marginBottom: '20px' }}>
              {post.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: 'var(--ink-faint)', fontFamily: 'var(--font-display)', fontWeight: 500 }}>
              <span>{post.date}</span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--line-2)', display: 'inline-block' }} />
              <span>{readTime} okuma</span>
            </div>
          </div>
        </div>

        {/* Cover image */}
        {hasImage && (
          <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="100vw"
              priority
              unoptimized={post.coverImageUrl.startsWith('data:')}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,.35) 100%)' }} />
          </div>
        )}

        {/* Content */}
        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '56px', alignItems: 'start' }} className="blog-article-grid">
              <article>
                {post.excerpt && (
                  <p style={{ fontSize: '19px', color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: '32px', fontStyle: 'italic', borderLeft: '3px solid var(--brand)', paddingLeft: '20px' }}>
                    {post.excerpt}
                  </p>
                )}
                {renderContent(post.content)}

                <div style={{ marginTop: '48px', padding: '32px', background: 'var(--brand-tint)', borderRadius: 'var(--r-lg)', borderLeft: '4px solid var(--brand)' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'var(--ink)', marginBottom: '10px' }}>Proje için fiyat teklifi alın</h4>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '15px', marginBottom: '18px', lineHeight: 1.6 }}>
                    Mekanik tesisat ve endüstriyel ürün ihtiyaçlarınız için hızlı teklif almak üzere bizimle iletişime geçin.
                  </p>
                  <Link href="/iletisim" style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 24px', borderRadius: 'var(--r-pill)', background: 'var(--brand)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px', textDecoration: 'none' }}>
                    İletişime Geç
                  </Link>
                </div>
              </article>

              {/* Sidebar */}
              <aside style={{ position: 'sticky', top: '96px' }}>
                <div style={{ background: 'var(--ink)', borderRadius: 'var(--r-lg)', padding: '24px', color: '#fff' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', marginBottom: '10px' }}>Teklif alın</h4>
                  <p style={{ fontSize: '14px', color: '#aab0aa', marginBottom: '16px', lineHeight: 1.5 }}>Projenize uygun fiyat için bize ulaşın.</p>
                  <Link href="/iletisim" style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: 'var(--r-pill)', background: 'var(--brand)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>
                    İletişime Geç
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .blog-article-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
