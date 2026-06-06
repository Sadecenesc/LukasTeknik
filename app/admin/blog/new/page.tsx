'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const BLOG_CATS = ['Yangın', 'Pompa', 'Genel', 'Isıtma', 'Endüstriyel', 'Teknik', 'Vana', 'Kazan']

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/İ/g, 'i').replace(/Ğ/g, 'g').replace(/Ü/g, 'u')
    .replace(/Ş/g, 's').replace(/Ö/g, 'o').replace(/Ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function NewBlogPage() {
  const router = useRouter()
  const [authed, setAuthed] = useState(false)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle')

  const [title, setTitle]           = useState('')
  const [slug, setSlug]             = useState('')
  const [slugManual, setSlugManual] = useState(false)
  const [excerpt, setExcerpt]       = useState('')
  const [content, setContent]       = useState('')
  const [cat, setCat]               = useState('Genel')
  const [tags, setTags]             = useState('')
  const [date, setDate]             = useState('')
  const [status, setStatus]         = useState<'Yayında' | 'Taslak'>('Taslak')
  const [coverImageUrl, setCoverImageUrl] = useState('')
  const [coverFileName, setCoverFileName] = useState('')
  const [coverFile, setCoverFile]   = useState<File | null>(null)
  const [metaTitle, setMetaTitle]   = useState('')
  const [metaDesc, setMetaDesc]     = useState('')

  const coverInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('lukas_admin_auth') !== '1') {
      router.replace('/admin'); return
    }
    setAuthed(true)
    setDate(new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }))
  }, [router])

  useEffect(() => {
    if (!slugManual) setSlug(slugify(title))
  }, [title, slugManual])

  const handleCoverFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return
    setCoverFileName(file.name)
    setCoverFile(file)
    setCoverImageUrl(URL.createObjectURL(file))
  }, [])

  async function doSave(publishStatus: 'Yayında' | 'Taslak') {
    if (!supabase) return
    setSaveState('saving')
    const id = String(Date.now())

    let coverUrl = ''
    if (coverFile) {
      const ext = coverFile.name.split('.').pop()
      const { data } = await supabase.storage.from('covers').upload(`${id}.${ext}`, coverFile, { upsert: true })
      if (data) {
        coverUrl = supabase.storage.from('covers').getPublicUrl(data.path).data.publicUrl
      }
    }

    const { error } = await supabase.from('blog_posts').insert({
      id,
      title: title.trim() || 'Başlıksız Yazı',
      slug: slug.trim() || id,
      content,
      excerpt,
      category: cat,
      tags,
      date,
      status: publishStatus,
      cover_url: coverUrl,
      meta_title: metaTitle || title,
      meta_desc: metaDesc || excerpt,
    })

    if (!error) {
      setSaveState('saved')
      setTimeout(() => router.push('/admin?view=blog'), 900)
    } else {
      setSaveState('idle')
    }
  }

  if (!authed) return null

  const lbl: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-display)', fontWeight: 600,
    fontSize: '14px', color: 'var(--ink)', marginBottom: '8px',
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '11px 14px',
    border: '1px solid #d1d5db', borderRadius: '8px',
    fontFamily: 'var(--font-body)', fontSize: '14.5px',
    background: '#fff', outline: 'none', boxSizing: 'border-box',
    color: 'var(--ink)', transition: 'border-color .15s',
  }

  const field: React.CSSProperties = { display: 'flex', flexDirection: 'column' }

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6', fontFamily: 'var(--font-body)' }}>

      {/* ── Top bar ── */}
      <header style={{
        background: '#fff', borderBottom: '1px solid #e5e7eb',
        padding: '0 28px', height: '58px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', color: 'var(--ink)' }}>
            <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: 'var(--ink)' }}>
            Lukas Teknik Yönetimi
          </span>
        </div>
        <Link href="/admin?view=blog" style={{
          display: 'flex', alignItems: 'center', gap: '7px',
          padding: '7px 16px', borderRadius: '8px',
          border: '1px solid #e5e7eb', background: '#fff',
          fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13.5px',
          color: 'var(--ink-2)', textDecoration: 'none',
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Çıkış
        </Link>
      </header>

      {/* ── Content ── */}
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '36px 24px 60px' }}>

        {/* Back link */}
        <Link href="/admin?view=blog" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '14px',
          color: 'var(--ink-soft)', textDecoration: 'none', marginBottom: '20px',
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
            <path d="m15 18-6-6 6-6" />
          </svg>
          Listeye dön
        </Link>

        {/* Page title */}
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', color: 'var(--ink)', marginBottom: '6px' }}>
          Yeni Blog Yazısı
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', marginBottom: '28px' }}>
          Yeni bir blog yazısı oluşturun.
        </p>

        {!supabase && (
          <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '8px', padding: '12px 18px', marginBottom: '20px', fontSize: '14px', fontFamily: 'var(--font-display)', color: '#856404' }}>
            ⚠️ Supabase bağlantısı yok — yazılar kaydedilemez.
          </div>
        )}

        {/* ── Form card ── */}
        <div style={{
          background: '#fff', borderRadius: '16px',
          border: '1px solid #e5e7eb',
          padding: '32px',
          display: 'flex', flexDirection: 'column', gap: '24px',
        }}>

          {/* Başlık + Slug */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="two-col">
            <div style={field}>
              <label style={lbl}>Başlık</label>
              <input
                style={inp}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn. Sprinkler Sistemlerde Vana Seçimi"
              />
            </div>
            <div style={field}>
              <label style={lbl}>URL (slug)</label>
              <input
                style={{ ...inp, fontFamily: 'monospace', fontSize: '13.5px' }}
                value={slug}
                onChange={(e) => { setSlug(e.target.value); setSlugManual(true) }}
                placeholder={title ? slugify(title) || 'yazi-slug' : 'basliktan-otomatik-uretilir'}
              />
            </div>
          </div>

          {/* Kısa açıklama */}
          <div style={field}>
            <label style={lbl}>Kısa açıklama</label>
            <input
              style={inp}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Karta ve arama sonuçlarına görünen tek satırlık açıklama"
              maxLength={200}
            />
          </div>

          {/* İçerik */}
          <div style={field}>
            <label style={lbl}>İçerik <span style={{ fontWeight: 400, color: 'var(--ink-faint)' }}>(her satır bir paragraf)</span></label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              placeholder={`Yazı içeriğini buraya yazın...\n\nMarkdown kullanabilirsiniz:\n## Alt Başlık\n**kalın metin**, *italik*\n- Madde listesi`}
              style={{ ...inp, resize: 'vertical', lineHeight: 1.7, minHeight: '200px' }}
            />
          </div>

          {/* Kategori + Tarih + Durum */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }} className="three-col">
            <div style={field}>
              <label style={lbl}>Kategori</label>
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                style={{ ...inp, cursor: 'pointer' }}
              >
                {BLOG_CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={field}>
              <label style={lbl}>Tarih</label>
              <input
                style={inp}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="14 Mayıs 2026"
              />
            </div>
            <div style={field}>
              <label style={lbl}>Durum</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'Yayında' | 'Taslak')}
                style={{ ...inp, cursor: 'pointer' }}
              >
                <option value="Taslak">Taslak</option>
                <option value="Yayında">Yayında</option>
              </select>
            </div>
          </div>

          {/* Etiketler */}
          <div style={field}>
            <label style={lbl}>Etiketler</label>
            <input
              style={inp}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="yangın, vana, sprinkler (virgülle ayırın)"
            />
          </div>

          {/* Divider */}
          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '4px 0' }} />

          {/* Kapak görseli */}
          <div style={field}>
            <label style={lbl}>Kapak görseli</label>
            {coverImageUrl ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImageUrl}
                  alt="Kapak"
                  style={{ width: '100%', maxHeight: '260px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #e5e7eb', display: 'block' }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '13.5px', color: 'var(--ink-soft)' }}>{coverFileName}</span>
                  <button
                    onClick={() => { setCoverImageUrl(''); setCoverFileName(''); setCoverFile(null) }}
                    style={{
                      padding: '5px 14px', borderRadius: '99px', border: '1px solid #e5e7eb',
                      background: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600,
                      fontSize: '12.5px', color: 'var(--ember)', cursor: 'pointer',
                    }}
                  >
                    Kaldır
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p style={{ fontSize: '13.5px', color: 'var(--ink-faint)', marginBottom: '12px' }}>
                  Henüz kapak seçilmedi. Aşağıdan bir dosya yükleyin.
                </p>
                <button
                  onClick={() => coverInputRef.current?.click()}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '9px 20px', borderRadius: '99px',
                    border: '1.5px dashed #d1d5db', background: '#fff',
                    fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13.5px',
                    color: 'var(--ink-2)', cursor: 'pointer', width: 'fit-content',
                    transition: 'border-color .15s, background .15s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--brand)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--brand-700)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#d1d5db'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink-2)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Kapak görseli yükle
                </button>
              </>
            )}
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleCoverFile(f) }}
            />
          </div>

          {/* Divider */}
          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '4px 0' }} />

          {/* Meta başlık + Meta açıklama */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="two-col">
            <div style={field}>
              <label style={lbl}>Meta başlık</label>
              <input
                style={inp}
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder={title || 'Sayfa başlığı (boşsa başlıktan alınır)'}
              />
            </div>
            <div style={field}>
              <label style={lbl}>Meta açıklama</label>
              <input
                style={inp}
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                placeholder={excerpt || 'SEO açıklaması (boşsa özetten alınır)'}
              />
            </div>
          </div>

          {/* ── Actions ── */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '8px', borderTop: '1px solid #e5e7eb', marginTop: '4px' }}>
            <Link
              href="/admin?view=blog"
              style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '11px 28px', borderRadius: '99px',
                border: '1.5px solid #d1d5db', background: '#fff',
                fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14.5px',
                color: 'var(--ink-2)', textDecoration: 'none',
              }}
            >
              İptal
            </Link>
            <button
              onClick={() => doSave(status)}
              disabled={saveState !== 'idle' || !supabase}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '11px 32px', borderRadius: '99px',
                border: 'none', background: 'var(--brand)', color: '#fff',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14.5px',
                cursor: saveState !== 'idle' ? 'default' : 'pointer',
                opacity: saveState !== 'idle' ? 0.7 : 1,
                transition: 'opacity .15s',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
              </svg>
              {saveState === 'saving' ? 'Kaydediliyor…' : saveState === 'saved' ? '✓ Kaydedildi' : 'Kaydet'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .two-col   { grid-template-columns: 1fr !important; }
          .three-col { grid-template-columns: 1fr !important; }
        }
        input:focus, select:focus, textarea:focus {
          border-color: var(--brand) !important;
          box-shadow: 0 0 0 3px rgba(95,158,52,.15);
        }
      `}</style>
    </div>
  )
}
