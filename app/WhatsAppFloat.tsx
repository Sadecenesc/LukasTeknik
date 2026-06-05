'use client'

import { useEffect, useState } from 'react'

const DEFAULT_WA = '905056995245'
const WA_MSG = encodeURIComponent('Merhaba, ürün ve fiyat bilgisi almak istiyorum.')

export default function WhatsAppFloat() {
  const [href, setHref] = useState(`https://wa.me/${DEFAULT_WA}?text=${WA_MSG}`)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lukas_social_links')
      const p = saved ? JSON.parse(saved) : {}
      localStorage.setItem('lukas_social_links', JSON.stringify({ ...p, whatsapp: DEFAULT_WA }))
    } catch {}
  }, [])

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geçin"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: '#25d366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textDecoration: 'none',
        zIndex: 9999,
        boxShadow: '0 4px 24px rgba(37,211,102,.55)',
      }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '32px', height: '32px' }}>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm4.76 13.73c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.59.13-.17.26-.67.85-.83 1.03-.15.17-.3.2-.56.07-.26-.13-1.1-.41-2.1-1.29-.78-.69-1.3-1.55-1.45-1.81-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.59-1.42-.81-1.94-.21-.51-.43-.44-.59-.45l-.5-.01c-.17 0-.46.06-.7.33-.24.26-.92.9-.92 2.19 0 1.29.94 2.53 1.07 2.71.13.17 1.85 2.83 4.48 3.96.63.27 1.11.43 1.49.55.63.2 1.2.17 1.65.1.5-.07 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.06-.11-.23-.17-.49-.3z" />
      </svg>
    </a>
  )
}
