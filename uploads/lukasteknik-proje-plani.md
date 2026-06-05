# ⚡ LukasTeknik Web Sitesi — Proje Planı

> **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Supabase · shadcn/ui · Framer Motion · Zod · React Hook Form · TipTap (rich text) · Vercel Deploy

---

## 🗂️ Proje Mimarisi

```
lukasteknik/
├── app/
│   ├── (site)/                  # Public site
│   │   ├── page.tsx             # Anasayfa
│   │   ├── hakkimizda/
│   │   ├── fiyat-listesi/
│   │   ├── blog/
│   │   │   └── [slug]/
│   │   └── iletisim/
│   ├── admin/                   # Admin paneli
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── ayarlar/
│   │   ├── blog/
│   │   ├── fiyatlar/
│   │   └── mesajlar/
│   └── api/
│       ├── contact/
│       ├── blog/
│       └── prices/
├── components/
│   ├── site/                    # Public bileşenler
│   └── admin/                   # Admin bileşenler
├── lib/
│   ├── supabase/
│   └── utils/
└── types/
```

---

## 📦 FAZ 1 — Temel Altyapı ve Kurulum
> **Süre:** ~1-2 gün | **Öncelik:** Kritik

### 1.1 Proje İskelet Kurulumu
- [x] `create-next-app@latest` ile Next.js 15 projesi oluştur (App Router + TypeScript)
- [x] Tailwind CSS v4 kurulumu ve konfigürasyonu
- [x] shadcn/ui init (`npx shadcn@latest init`)
- [x] Framer Motion, Zod, React Hook Form, TipTap kurulumu
- [x] `@supabase/ssr` ve `@supabase/supabase-js` kurulumu
- [x] ESLint + Prettier konfigürasyonu
- [x] `.env.local.example` dosyası oluştur (Supabase URL, ANON KEY, SERVICE KEY)
- [x] Klasör yapısını oluştur

### 1.2 Supabase Veritabanı Şeması
- [x] **`site_settings`** tablosu:
  ```sql
  id, key TEXT UNIQUE, value JSONB, updated_at
  ```
- [x] **`blog_posts`** tablosu:
  ```sql
  id, title, slug UNIQUE, content (rich text), excerpt,
  cover_image_url, published BOOLEAN, published_at, created_at, updated_at
  ```
- [x] **`price_list`** tablosu:
  ```sql
  id, category, service_name, description, price, unit,
  sort_order, is_active, created_at, updated_at
  ```
- [x] **`contact_messages`** tablosu:
  ```sql
  id, name, email, phone, subject, message,
  is_read BOOLEAN, created_at
  ```
- [x] **`admin_users`** tablosu (Supabase Auth bağlı):
  ```sql
  id (uuid, FK auth.users), email, full_name, role ENUM('super_admin','editor'), created_at
  ```
- [x] Row Level Security (RLS) politikaları yaz
- [x] Supabase Storage bucket: `media` (blog görselleri, logo, favicon)

### 1.3 Auth Altyapısı
- [x] Supabase Auth email/password provider aktif et
- [x] `middleware.ts` → `/admin/*` rotalarını koru
- [x] `lib/supabase/server.ts` ve `lib/supabase/client.ts` helper'ları
- [x] Admin login sayfası (`/admin/login`)
- [x] Session yönetimi (cookie-based SSR)

---

## 📦 FAZ 2 — Site Ayarları Sistemi (Admin Çekirdeği)
> **Süre:** ~1 gün | **Öncelik:** Kritik (her şey buraya bağlı)

### 2.1 `site_settings` Veri Modeli
Aşağıdaki key'ler `site_settings` tablosunda JSON olarak saklanır:

| Key | İçerik |
|-----|--------|
| `general` | Site adı, slogan, logo URL, favicon URL |
| `contact_info` | Adres, telefon(lar), e-posta, çalışma saatleri |
| `social_links` | WhatsApp, Instagram, X (Twitter), TikTok URL'leri |
| `seo` | Meta title template, meta description, OG image |
| `homepage_hero` | Başlık, alt başlık, CTA metni, CTA linki, arka plan görseli |
| `homepage_services` | Öne çıkan hizmet kartları (JSON array) |
| `homepage_stats` | İstatistik sayaçları (proje sayısı, müşteri, yıl vb.) |
| `about_page` | Hakkımızda sayfa içeriği (rich text + görseller) |
| `footer` | Footer metni, linkler |
| `theme` | Primary renk, accent renk |

### 2.2 Admin Ayarlar Paneli
- [x] `/admin/ayarlar/genel` — Logo, favicon, site adı, slogan yükle/güncelle
- [x] `/admin/ayarlar/iletisim` — Adres, telefonlar, e-posta, çalışma saatleri
- [x] `/admin/ayarlar/sosyal-medya` — WA, Instagram, X, TikTok linkleri
- [x] `/admin/ayarlar/seo` — Meta bilgileri, OG görseli
- [x] `/admin/ayarlar/anasayfa` — Hero bölümü, hizmetler, istatistikler
- [x] `/admin/ayarlar/hakkimizda` — Sayfa içerik editörü
- [x] `/admin/ayarlar/tema` — Renk seçici (primary/accent)
- [x] Ayar kaydetme: `upsert` ile tek API endpoint (`/api/settings`)
- [x] Supabase Storage entegrasyonu → görsel yükleme komponenti (drag & drop)

---

## 📦 FAZ 3 — Public Site — Tasarım ve Layout
> **Süre:** ~2 gün | **Öncelik:** Yüksek

### 3.1 Global Layout
- [x] `app/(site)/layout.tsx` — Navbar + Footer wrapper
- [x] **Navbar** (dinamik, ayarlardan beslenecek):
  - Logo (SVG veya görsel)
  - Menü: Anasayfa · Hakkımızda · Fiyat Listesi · Blog · İletişim
  - Sağda: Telefon numarası (tıklanabilir) + WhatsApp ikonu
  - Mobil hamburger menü (smooth slide)
  - Scroll'da blur/shadow efekti
- [x] **Footer** (dinamik):
  - Logo + kısa açıklama
  - Hızlı linkler
  - İletişim bilgileri
  - Sosyal medya ikonları: WhatsApp · Instagram · X · TikTok
  - Alt bar: Telif hakkı

### 3.2 Anasayfa (`/`)
- [x] **Hero Section** — Tam ekran, başlık + alt başlık + CTA butonu, arka plan görseli/gradient
- [x] **Hizmetler Section** — Grid kart düzeni, ikon + başlık + kısa açıklama
- [x] **Hakkımızda Özeti** — Sol görsel / sağ metin, CTA butonu
- [x] **İstatistikler** — Sayaç animasyonlu (tamamlanan proje, müşteri, yıl)
- [x] **Son Blog Yazıları** — 3 kart, görsel + başlık + tarih
- [x] **İletişim CTA** — Geniş band, telefon ve WhatsApp butonu
- [x] Scroll-triggered animasyonlar (Framer Motion)

### 3.3 Hakkımızda (`/hakkimizda`)
- [ ] Hero banner
- [ ] Şirket hikayesi (rich text, admin'den)
- [ ] Değerler/misyon bölümü
- [ ] Ekip kartları (opsiyonel, ayarlardan)

### 3.4 Fiyat Listesi (`/fiyat-listesi`)
- [ ] Kategori sekmeleri (dinamik, DB'den)
- [ ] Her kategoride tablo: Hizmet · Açıklama · Birim · Fiyat
- [ ] "Fiyat bilgisi yaklaşık olup değişebilir" notu
- [ ] İletişim CTA

### 3.5 Blog (`/blog`)
- [ ] Kart grid listesi (kapak görseli, başlık, özet, tarih, okuma süresi)
- [ ] Arama/filtre
- [ ] Pagination

### 3.6 Blog Detay (`/blog/[slug]`)
- [ ] Kapak görseli
- [ ] Rich text içerik render (TipTap output → HTML)
- [ ] Sosyal paylaşım butonları
- [ ] İlgili yazılar

### 3.7 İletişim (`/iletisim`)
- [ ] İletişim formu: Ad, Soyad, Telefon, E-posta, Konu, Mesaj
- [ ] Form validasyonu (Zod + React Hook Form)
- [ ] Başarılı gönderim → DB'ye kaydet + kullanıcıya onay
- [ ] Google Maps embed (adres ayardan)
- [ ] İletişim bilgi kartları (telefon, e-posta, adres, saatler)
- [ ] WhatsApp hızlı mesaj butonu

---

## 📦 FAZ 4 — Admin Paneli — İçerik Yönetimi
> **Süre:** ~2 gün | **Öncelik:** Yüksek

### 4.1 Admin Layout ve Dashboard
- [ ] `/admin` → sidebar navigasyon
- [ ] Dashboard: Mesaj sayısı, okunmamış mesajlar, blog yazı sayısı, son aktivite
- [ ] Responsive sidebar (collapse)

### 4.2 Blog Yönetimi
- [ ] `/admin/blog` — Yazı listesi (başlık, durum, tarih, işlemler)
- [ ] `/admin/blog/yeni` — Yeni yazı oluştur
- [ ] `/admin/blog/[id]/duzenle` — Yazı düzenle
- [ ] **TipTap editör**: Bold, italic, heading, liste, link, görsel ekleme
- [ ] Slug otomatik üretimi (başlıktan, Türkçe karakter normalize)
- [ ] Kapak görseli yükleme (Supabase Storage)
- [ ] Yayınla / Taslak olarak kaydet toggle
- [ ] Yazı silme (soft delete veya hard delete)

### 4.3 Fiyat Listesi Yönetimi
- [ ] `/admin/fiyatlar` — Tablo listesi + kategori filtre
- [ ] Yeni kayıt ekleme (inline form veya modal)
- [ ] Düzenleme (inline edit)
- [ ] Kategori yönetimi (ekleme/silme)
- [ ] Sıralama (drag & drop)
- [ ] Aktif/pasif toggle

### 4.4 Mesaj Yönetimi
- [ ] `/admin/mesajlar` — Mesaj listesi (okundu/okunmadı badge)
- [ ] Mesaj detay sayfası
- [ ] Okundu olarak işaretle
- [ ] Mesaj silme
- [ ] Filtreleme (tarih, okundu/okunmadı)

### 4.5 Kullanıcı Yönetimi (Super Admin only)
- [ ] `/admin/kullanicilar` — Admin kullanıcı listesi
- [ ] Yeni admin davet et (e-posta ile Supabase invite)
- [ ] Rol değiştir (super_admin / editor)
- [ ] Kullanıcı deaktif et
- [ ] Şifre sıfırlama linki gönder

---

## 📦 FAZ 5 — SEO, Performans ve Güvenlik
> **Süre:** ~1 gün | **Öncelik:** Orta

### 5.1 SEO
- [ ] `generateMetadata()` her sayfa için (ayarlardan dinamik)
- [ ] `robots.ts` — admin dizini engelle
- [ ] `sitemap.ts` — dinamik sitemap (blog yazıları dahil)
- [ ] Open Graph ve Twitter Card meta etiketleri
- [ ] Structured Data (JSON-LD): LocalBusiness schema
- [ ] Canonical URL'ler

### 5.2 Performans
- [ ] Next.js `Image` komponenti her görsel için (`priority` hero'da)
- [ ] Font optimizasyonu (`next/font/google`)
- [ ] Statik sayfalar için ISR (Incremental Static Regeneration)
- [ ] Blog listesi için `revalidate`
- [ ] Bundle analizi (`@next/bundle-analyzer`)

### 5.3 Güvenlik
- [ ] Admin route'larında middleware auth kontrolü
- [ ] API route'larında service role key ile Supabase işlemleri
- [ ] İletişim formu rate limiting (Upstash Redis veya basit IP kontrolü)
- [ ] Environment variable doğrulama (`@t3-oss/env-nextjs`)
- [ ] Content Security Policy header'ları

---

## 📦 FAZ 6 — Deployment ve DevOps
> **Süre:** ~0.5 gün | **Öncelik:** Orta

- [ ] Vercel projesi oluştur, GitHub repo bağla
- [ ] Environment variables Vercel'e ekle
- [ ] Custom domain bağlama
- [ ] Supabase production ortamı (RLS kontrol et)
- [ ] Vercel Analytics aktif et
- [ ] Preview deployments için branch koruması
- [ ] `README.md` — kurulum ve geliştirme kılavuzu

---

## 📦 FAZ 6.5 (Bonus) — Ek Özellikler
> İsteğe bağlı, sonradan eklenebilir

- [ ] **WhatsApp Widget** — Sayfanın sağ alt köşesinde yüzen WA butonu (admin'den numara ve mesaj ayarlanabilir)
- [ ] **Cookie Banner** — KVKK uyumu
- [ ] **Arama** — Blog içi full-text search (Supabase `to_tsquery`)
- [ ] **Görüntülenme sayacı** — Blog yazıları için
- [ ] **Şikayet/öneri formu** ayrı sekme
- [ ] **Dark mode** toggle
- [ ] **PWA** manifest

---

## 🔑 Supabase Kurulum Checklist

```bash
# .env.local dosyasına eklenecekler:
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # Sadece server-side
```

**RLS Politika Özeti:**
- `site_settings` → Public READ, sadece admin WRITE
- `blog_posts` → Published olanlar PUBLIC READ, admin tüm CRUD
- `price_list` → Active olanlar PUBLIC READ, admin tüm CRUD
- `contact_messages` → Herkes INSERT, sadece admin READ/UPDATE/DELETE
- `admin_users` → Sadece super_admin erişebilir

---

## 📊 Görev Özeti

| Faz | Açıklama | Tahmini Süre | Öncelik |
|-----|----------|-------------|---------|
| 1 | Altyapı & DB | 1-2 gün | 🔴 Kritik |
| 2 | Site Ayarları Sistemi | 1 gün | 🔴 Kritik |
| 3 | Public Site Tasarım | 2 gün | 🟠 Yüksek |
| 4 | Admin İçerik Yönetimi | 2 gün | 🟠 Yüksek |
| 5 | SEO & Performans | 1 gün | 🟡 Orta |
| 6 | Deployment | 0.5 gün | 🟡 Orta |
| 6.5 | Bonus Özellikler | Değişken | 🟢 Düşük |

**Toplam Tahmini:** ~7.5 iş günü (tek geliştirici)

---

## 🚀 Başlangıç Komutu

```bash
npx create-next-app@latest lukasteknik \
  --typescript \
  --tailwind \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd lukasteknik
npx shadcn@latest init
npm install @supabase/ssr @supabase/supabase-js framer-motion \
  @tiptap/react @tiptap/starter-kit @tiptap/extension-image \
  react-hook-form @hookform/resolvers zod \
  @t3-oss/env-nextjs lucide-react
```

---

*Herhangi bir fazı detaylandırmamı veya doğrudan kodlamaya başlamamı istersen söyle!*
