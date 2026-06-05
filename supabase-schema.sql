-- ============================================================
-- Lukas Teknik — Supabase Tablo Şeması
-- Supabase Dashboard → SQL Editor → New Query → Yapıştır → Run
-- ============================================================

-- Teklif talepleri tablosu
create table if not exists teklifler (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),

  ad_soyad     text not null,
  firma        text,
  telefon      text not null,
  eposta       text not null,
  kategoriler  text[] not null default '{}',
  proje_tipi   text,
  termin       text,
  detay        text not null,
  dosya_adi    text,

  -- Admin takibi
  durum        text not null default 'yeni'   -- yeni | islemde | tamamlandi
    check (durum in ('yeni', 'islemde', 'tamamlandi')),
  notlar       text
);

-- İletişim mesajları tablosu
create table if not exists mesajlar (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  ad_soyad   text not null,
  firma      text,
  telefon    text not null,
  eposta     text,
  konu       text,
  mesaj      text not null,

  -- Admin takibi
  durum      text not null default 'yeni'
    check (durum in ('yeni', 'islemde', 'tamamlandi')),
  notlar     text
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

-- Teklif tablosu: herkes insert yapabilir, okuma kapalı
alter table teklifler enable row level security;

create policy "Herkes teklif gönderebilir"
  on teklifler for insert
  to anon, authenticated
  with check (true);

-- Sadece authenticated (admin) kullanıcılar okuyabilir
create policy "Sadece admin okuyabilir"
  on teklifler for select
  to authenticated
  using (true);

-- Mesaj tablosu: herkes insert yapabilir, okuma kapalı
alter table mesajlar enable row level security;

create policy "Herkes mesaj gönderebilir"
  on mesajlar for insert
  to anon, authenticated
  with check (true);

create policy "Sadece admin mesajları okuyabilir"
  on mesajlar for select
  to authenticated
  using (true);
