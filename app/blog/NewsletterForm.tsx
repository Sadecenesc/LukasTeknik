'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    if (supabase) {
      await supabase.from('newsletter_subscribers').insert({ email: email.trim() })
    }
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px 24px', borderRadius: 'var(--r-pill)', background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', color: '#5fe87f', flexShrink: 0 }}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px', color: '#fff' }}>
          Teşekkürler! Bültenimize kaydoldunuz.
        </span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <input
        type="email"
        placeholder="E-posta adresiniz"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '15px 20px', borderRadius: 'var(--r-pill)', border: '1px solid #3a4148', background: '#22272d', color: '#fff', fontFamily: 'inherit', fontSize: '15px', minWidth: '260px', outline: 'none' }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{ display: 'inline-flex', alignItems: 'center', padding: '15px 28px', borderRadius: 'var(--r-pill)', background: 'var(--brand)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '16px', border: 'none', cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.7 : 1 }}
      >
        {loading ? 'Kaydediliyor…' : 'Abone Ol'}
      </button>
    </form>
  )
}
