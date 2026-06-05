import { MetadataRoute } from 'next'

const BASE = 'https://www.lukasteknik.com'

const BLOG_SLUGS = [
  'hidrofor-grubu-boyutlandirma',
  'tse-ce-belgelendirme',
  'yangin-pompasi-secimi',
  'vana-tipleri-rehberi',
  'enerji-verimli-isitma-iptiplari',
  'sprinkler-tasarim-kurallari',
  'endustriyel-pompa-bakimi',
  'malzeme-secimi-nasil-yapilir',
  'fan-coil-vs-klima-santrali',
]

const FIYAT_SLUGS = [
  'flamco', 'grundfos', 'honeywell', 'watts', 'gestra', 'viking',
  'tyco', 'danfoss', 'daikin', 'alfa-laval', 'spirax-sarco', 'georg-fischer',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: BASE,                        lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/hakkimizda`,        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/fiyat-listesi`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/blog`,              lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/iletisim`,          lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/referanslar`,       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/teklif-al`,         lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/gizlilik`,          lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/kvkk`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    ...BLOG_SLUGS.map((slug) => ({
      url: `${BASE}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...FIYAT_SLUGS.map((slug) => ({
      url: `${BASE}/fiyat-listesi/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
