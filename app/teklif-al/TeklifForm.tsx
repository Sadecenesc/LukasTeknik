'use client'

import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'

const SITE = {
  phone: '0505 699 52 45',
  phoneHref: 'tel:+905056995245',
  whatsapp: '905056995245',
  waMsg: 'Merhaba, teklif almak istiyorum.',
}

const waLink = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.waMsg)}`

interface FormData {
  adSoyad: string
  firma: string
  telefon: string
  eposta: string
  dosya: File | null
}

const emptyForm: FormData = {
  adSoyad: '',
  firma: '',
  telefon: '',
  eposta: '',
  dosya: null,
}

async function submitToSupabase(data: Omit<FormData, 'dosya'> & { dosyaAdi: string | null }) {
  if (!supabase) {
    console.warn('[TeklifForm] Supabase yapılandırılmamış — form verisi kaydedilmedi.')
    return
  }
  const { error } = await supabase.from('teklifler').insert([{
    ad_soyad:    data.adSoyad,
    firma:       data.firma || null,
    telefon:     data.telefon,
    eposta:      data.eposta,
    kategoriler: [],
    proje_tipi:  null,
    termin:      null,
    detay:       '',
    dosya_adi:   data.dosyaAdi,
  }])
  if (error) throw error
}

export default function TeklifForm() {
  const [form, setForm] = useState<FormData>(emptyForm)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, dosya: e.target.files?.[0] ?? null }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await submitToSupabase({
        adSoyad: form.adSoyad,
        firma: form.firma,
        telefon: form.telefon,
        eposta: form.eposta,
        dosyaAdi: form.dosya?.name ?? null,
      })
      setSubmitted(true)
    } catch {
      setError('Bir hata oluştu. Lütfen tekrar deneyin veya bizi arayın.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px',
    border: '1px solid var(--line-2)',
    borderRadius: 'var(--r-sm)',
    fontFamily: 'var(--font-body)',
    fontSize: '15.5px',
    background: '#fff',
    color: 'var(--ink)',
    outline: 'none',
    transition: 'border-color .18s, box-shadow .18s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-display)',
    fontWeight: 500,
    fontSize: '14px',
    marginBottom: '8px',
    color: 'var(--ink-2)',
  }

  return (
    <div className="quote-layout" style={{ display: 'grid', gridTemplateColumns: '1.25fr .75fr', gap: '54px', alignItems: 'start' }}>

      {/* ===== FORM CARD ===== */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: '38px', boxShadow: 'var(--shadow-sm)' }}>

        {/* Success state */}
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 30px' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--brand)', color: '#fff', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '38px', height: '38px' }}>
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '10px' }}>Teklif talebiniz alındı!</h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: '16px', maxWidth: '380px', margin: '0 auto', lineHeight: 1.6 }}>
              Teşekkürler. Ekibimiz talebinizi inceleyip mesai saatleri içinde size dönüş yapacak. Acil durumlar için bizi arayabilirsiniz.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>

            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', marginBottom: '28px', color: 'var(--ink)' }}>
              İletişim Bilgileriniz
            </h2>

            {/* Ad Soyad + Firma */}
            <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>
                  Ad Soyad <span style={{ color: 'var(--ember)' }}>*</span>
                </label>
                <input
                  style={inputStyle}
                  type="text"
                  name="adSoyad"
                  required
                  placeholder="Adınız"
                  value={form.adSoyad}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label style={labelStyle}>Firma / Kurum</label>
                <input
                  style={inputStyle}
                  type="text"
                  name="firma"
                  placeholder="Firma adı"
                  value={form.firma}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Telefon + E-posta */}
            <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '24px' }}>
              <div>
                <label style={labelStyle}>
                  Telefon <span style={{ color: 'var(--ember)' }}>*</span>
                </label>
                <input
                  style={inputStyle}
                  type="tel"
                  name="telefon"
                  required
                  placeholder="05xx xxx xx xx"
                  value={form.telefon}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label style={labelStyle}>
                  E-posta <span style={{ color: 'var(--ember)' }}>*</span>
                </label>
                <input
                  style={inputStyle}
                  type="email"
                  name="eposta"
                  required
                  placeholder="ornek@firma.com"
                  value={form.eposta}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Dosya yükleme */}
            <div style={{ marginBottom: '28px' }}>
              <label style={labelStyle}>Malzeme listesi / proje dosyası</label>
              <label
                htmlFor="dosya-input"
                style={{
                  display: 'block',
                  border: '2px dashed var(--line-2)',
                  borderRadius: 'var(--r)',
                  padding: '28px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: 'var(--bg-soft)',
                  transition: 'border-color .2s, background .2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--brand)'; e.currentTarget.style.background = 'var(--brand-tint)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line-2)'; e.currentTarget.style.background = 'var(--bg-soft)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px', color: 'var(--brand-700)', margin: '0 auto 10px', display: 'block' }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                </svg>
                <b style={{ fontFamily: 'var(--font-display)', fontSize: '15px', display: 'block', marginBottom: '4px' }}>
                  {form.dosya ? form.dosya.name : 'Dosya yükleyin veya sürükleyin'}
                </b>
                <span style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>PDF, Excel, görsel · en fazla 10 MB</span>
                <input
                  ref={fileRef}
                  id="dosya-input"
                  type="file"
                  accept=".pdf,.xls,.xlsx,.doc,.docx,.jpg,.jpeg,.png"
                  style={{ display: 'none' }}
                  onChange={handleFile}
                />
              </label>
            </div>

            {/* Hata mesajı */}
            {error && (
              <div style={{ marginBottom: '16px', padding: '12px 16px', background: 'var(--ember-tint)', border: '1px solid var(--ember)', borderRadius: 'var(--r-sm)', color: 'var(--ember)', fontSize: '14.5px', fontFamily: 'var(--font-display)' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '16px 30px',
                borderRadius: 'var(--r-pill)',
                background: loading ? 'var(--brand-600)' : 'var(--brand)',
                color: '#fff',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '17px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background .2s',
                opacity: loading ? 0.75 : 1,
              }}
            >
              {loading ? (
                <>
                  <span style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin .7s linear infinite' }} />
                  Gönderiliyor…
                </>
              ) : 'Teklif Talebini Gönder'}
            </button>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </form>
        )}
      </div>

      {/* ===== SIDEBAR ===== */}
      <aside>
        <div className="side-card-sticky" style={{ background: 'var(--ink)', color: '#dfe4df', borderRadius: 'var(--r-lg)', padding: '32px', position: 'sticky', top: '96px' }}>
          <h3 style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '21px', marginBottom: '20px' }}>
            Neden Lukas Teknik?
          </h3>

          {[
            { title: 'Aynı gün dönüş', desc: 'Mesai içi taleplerde hızlı teklif' },
            { title: '8.000+ ürün kalemi', desc: 'Tek tedarikçiden komple çözüm' },
            { title: 'Sertifikalı ürünler', desc: 'TSE & CE uyumlu, belgeli' },
            { title: 'Teknik destek', desc: 'Doğru ürün seçiminde yanınızda' },
          ].map((item) => (
            <div key={item.title} style={{ display: 'flex', gap: '13px', alignItems: 'flex-start', marginBottom: '18px' }}>
              <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--brand)', color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: '1px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <div>
                <b style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '15.5px', display: 'block' }}>{item.title}</b>
                <span style={{ fontSize: '14px', color: '#aab0aa' }}>{item.desc}</span>
              </div>
            </div>
          ))}

          <div style={{ height: '1px', background: 'rgba(255,255,255,.12)', margin: '24px 0' }} />

          <p style={{ color: '#aab0aa', fontSize: '14px', marginBottom: '16px' }}>Hemen konuşmak ister misiniz?</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a
              href={SITE.phoneHref}
              style={{ display: 'flex', alignItems: 'center', gap: '11px', color: '#dfe4df', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '15.5px', textDecoration: 'none' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px', color: 'var(--brand)', flexShrink: 0 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {SITE.phone}
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '11px', color: '#dfe4df', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '15.5px', textDecoration: 'none' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px', color: '#25d366', flexShrink: 0 }}>
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm4.76 13.73c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.59.13-.17.26-.67.85-.83 1.03-.15.17-.3.2-.56.07-.26-.13-1.1-.41-2.1-1.29-.78-.69-1.3-1.55-1.45-1.81-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.59-1.42-.81-1.94-.21-.51-.43-.44-.59-.45l-.5-.01c-.17 0-.46.06-.7.33-.24.26-.92.9-.92 2.19 0 1.29.94 2.53 1.07 2.71.13.17 1.85 2.83 4.48 3.96.63.27 1.11.43 1.49.55.63.2 1.2.17 1.65.1.5-.07 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.06-.11-.23-.17-.49-.3z" />
              </svg>
              WhatsApp&apos;tan yaz
            </a>
          </div>
        </div>
      </aside>
    </div>
  )
}
