# Lukas Teknik

**Lukas Teknik** — Tesisat, HVAC ve yangın söndürme sistemleri alanında hizmet veren teknik yapı malzemeleri firmasının kurumsal web sitesi.

Next.js 15 App Router, TypeScript, Tailwind CSS ve Supabase altyapısı ile geliştirilmiştir.

---

## Özellikler

- Ürün ve fiyat listesi (kategori bazlı filtreleme)
- Dinamik blog sistemi (Supabase destekli, admin paneli ile yönetim)
- Teklif al formu
- WhatsApp hızlı iletişim butonu
- SEO optimizasyonu (JSON-LD, sitemap, robots.txt)
- Tam responsive tasarım
- Admin paneli (blog oluştur / düzenle / sil)

---

## Teknoloji Yığını

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 15 (App Router) |
| Dil | TypeScript |
| Stil | Tailwind CSS |
| Veritabanı | Supabase (PostgreSQL) |
| Deploy | Vercel (önerilen) |

---

## Kurulum

### 1. Repoyu klonlayın

```bash
git clone https://github.com/Sadecenesc/LukasTeknik.git
cd LukasTeknik
```

### 2. Bağımlılıkları yükleyin

```bash
npm install
```

### 3. Ortam değişkenlerini ayarlayın

```bash
cp .env.example .env.local
```

`.env.local` dosyasını açıp Supabase bilgilerinizi girin:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> Supabase anahtarlarını [Supabase Dashboard](https://supabase.com/dashboard) → Settings → API bölümünden alabilirsiniz.

### 4. Veritabanı şemasını oluşturun

Supabase SQL editöründe `supabase-schema.sql` dosyasını çalıştırın.

### 5. Geliştirme sunucusunu başlatın

```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışır.

---

## Build & Deploy

```bash
# Production build
npm run build

# Lokal olarak çalıştır
npm start
```

**Vercel ile deploy:** Repoyu Vercel'e bağlayıp `.env.local` içindeki değişkenleri Vercel ortam değişkenlerine ekleyin, otomatik deploy başlar.

---

## Proje Yapısı

```
├── app/
│   ├── page.tsx              # Ana Sayfa
│   ├── layout.tsx            # Root layout + SEO
│   ├── hakkimizda/           # Hakkımızda
│   ├── fiyat-listesi/        # Ürün & Fiyat Listesi
│   ├── blog/                 # Blog listesi ve detay
│   ├── iletisim/             # İletişim formu
│   ├── teklif-al/            # Teklif formu
│   ├── referanslar/          # Referanslar
│   ├── admin/                # Admin paneli (blog yönetimi)
│   ├── gizlilik/             # Gizlilik Politikası
│   └── kvkk/                 # KVKK
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── PageHero.tsx
├── lib/
│   └── supabase.ts           # Supabase client
├── public/assets/            # Görseller ve logolar
├── supabase-schema.sql       # Veritabanı şeması
└── .env.example              # Ortam değişkenleri şablonu
```

---

## Admin Paneli

`/admin` sayfasına giderek blog yazıları oluşturabilir, düzenleyebilir ve silebilirsiniz. Supabase üzerinden kimlik doğrulaması yapılmaktadır.

---

## İletişim

| | |
|---|---|
| Adres | Siyavuşpaşa, Köprübaşı Sk. No:29/A, 34182 Bahçelievler/İstanbul |
| Telefon | 0505 699 52 45 |
| E-posta | info@lukasteknik.com |
| Web | [lukasteknik.com](https://lukasteknik.com) |
