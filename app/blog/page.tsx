import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import BlogList from './BlogList'
import NewsletterForm from './NewsletterForm'

export const metadata: Metadata = {
  title: 'Blog — Teknik Rehberler ve Sektör Notları',
  description:
    'Yangın sistemleri, sprinkler, pompa, vana, ısıtma-soğutma ve mekanik tesisat konularında mühendislere özel teknik rehberler, boyutlandırma kılavuzları ve sektör güncellemeleri.',
  openGraph: {
    title: 'Blog — Lukas Teknik Teknik Rehberler',
    description:
      'Yangın sistemleri, sprinkler, pompa, vana ve mekanik tesisat konularında teknik rehberler ve sektör notları.',
    url: 'https://www.lukasteknik.com/blog',
    images: [{
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&fit=crop',
      width: 1200, height: 630,
      alt: 'Lukas Teknik Blog — Teknik Rehberler',
    }],
  },
  alternates: { canonical: 'https://www.lukasteknik.com/blog' },
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          breadcrumb="Blog"
          title="Bilgi & Blog"
          description="Mekanik tesisat, yangın sistemleri, ısıtma-soğutma ve endüstriyel ürünler üzerine teknik rehberler ve sektör notları."
        />
        <section className="section">
          <div className="container">
            <BlogList />
          </div>
        </section>

        {/* Newsletter */}
        <section className="section-sm">
          <div className="container">
            <div style={{ background: 'var(--ink)', borderRadius: '24px', padding: '48px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3vw,32px)' }}>Teknik bültene abone olun</h2>
                <p style={{ color: '#aab0aa', marginTop: '10px', fontSize: '16.5px', maxWidth: '440px' }}>Yeni ürünler, sektör güncellemeleri ve teknik rehberler ayda bir e-postanızda.</p>
              </div>
              <NewsletterForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

