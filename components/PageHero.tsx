import Link from 'next/link'

interface Props {
  breadcrumb: string
  title: string
  description?: string
}

export default function PageHero({ breadcrumb, title, description }: Props) {
  return (
    <section style={{ background: 'linear-gradient(180deg, var(--bg-soft) 0%, #fff 100%)', borderBottom: '1px solid var(--line)', padding: '56px 0 48px' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--ink-faint)', fontFamily: 'var(--font-display)', marginBottom: '20px' }}>
          <Link href="/" style={{ color: 'var(--ink-faint)', textDecoration: 'none' }}>Ana Sayfa</Link>
          <span>/</span>
          <span style={{ color: 'var(--ink-soft)' }}>{breadcrumb}</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-.03em', marginBottom: description ? '16px' : 0, lineHeight: 1.1 }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {description && (
          <p style={{ color: 'var(--ink-soft)', fontSize: '18px', maxWidth: '620px', lineHeight: 1.6 }}>{description}</p>
        )}
      </div>
    </section>
  )
}
