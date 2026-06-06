-- ============================================================
-- Lukas Teknik — Supabase Kurulum SQL
-- Supabase Dashboard → SQL Editor → Yeni sorgu → Çalıştır
-- ============================================================

-- 1. Fiyat Listesi tablosu
create table if not exists fiyat_listesi (
  id          text primary key,
  firma       text not null,
  logo_url    text default '',
  pdf_url     text default '',
  pdf_name    text default '',
  created_at  timestamptz default now()
);

alter table fiyat_listesi enable row level security;

drop policy if exists "fiyat_listesi_select" on fiyat_listesi;
drop policy if exists "fiyat_listesi_all"    on fiyat_listesi;

create policy "fiyat_listesi_select" on fiyat_listesi
  for select using (true);

create policy "fiyat_listesi_all" on fiyat_listesi
  for all using (true) with check (true);

-- 2. Site ayarları tablosu (sosyal medya linkleri)
create table if not exists site_settings (
  key    text primary key,
  value  text default ''
);

alter table site_settings enable row level security;

drop policy if exists "site_settings_select" on site_settings;
drop policy if exists "site_settings_all"    on site_settings;

create policy "site_settings_select" on site_settings
  for select using (true);

create policy "site_settings_all" on site_settings
  for all using (true) with check (true);

-- 3. Blog yazıları tablosu
create table if not exists blog_posts (
  id          text primary key,
  title       text not null,
  slug        text unique not null,
  content     text default '',
  excerpt     text default '',
  category    text default 'Genel',
  tags        text default '',
  date        text default '',
  status      text default 'Taslak',
  cover_url   text default '',
  meta_title  text default '',
  meta_desc   text default '',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

alter table blog_posts enable row level security;

drop policy if exists "blog_posts_select" on blog_posts;
drop policy if exists "blog_posts_all"    on blog_posts;

create policy "blog_posts_select" on blog_posts
  for select using (true);

create policy "blog_posts_all" on blog_posts
  for all using (true) with check (true);

-- 4. Newsletter aboneleri tablosu
create table if not exists newsletter_subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  created_at timestamptz default now()
);

alter table newsletter_subscribers enable row level security;

drop policy if exists "newsletter_insert" on newsletter_subscribers;
drop policy if exists "newsletter_select" on newsletter_subscribers;

create policy "newsletter_insert" on newsletter_subscribers
  for insert with check (true);

create policy "newsletter_select" on newsletter_subscribers
  for select using (true);

-- 5. Başlangıç sosyal medya verileri
insert into site_settings (key, value) values
  ('instagram', ''),
  ('linkedin',  ''),
  ('whatsapp',  '905056995245')
on conflict (key) do nothing;

-- ============================================================
-- Storage buckets (Dashboard > Storage > New bucket ile de yapılabilir)
-- ============================================================

insert into storage.buckets (id, name, public)
values ('pdfs',   'pdfs',   true),
       ('logos',  'logos',  true),
       ('covers', 'covers', true)
on conflict (id) do nothing;

-- Storage policy: herkes okuyabilir, yazar herkese açık
drop policy if exists "pdfs_public_read"    on storage.objects;
drop policy if exists "logos_public_read"   on storage.objects;
drop policy if exists "covers_public_read"  on storage.objects;
drop policy if exists "pdfs_anon_write"     on storage.objects;
drop policy if exists "logos_anon_write"    on storage.objects;
drop policy if exists "covers_anon_write"   on storage.objects;

create policy "pdfs_public_read"   on storage.objects for select using (bucket_id = 'pdfs');
create policy "logos_public_read"  on storage.objects for select using (bucket_id = 'logos');
create policy "covers_public_read" on storage.objects for select using (bucket_id = 'covers');

create policy "pdfs_anon_write"   on storage.objects for all using (bucket_id = 'pdfs')   with check (bucket_id = 'pdfs');
create policy "logos_anon_write"  on storage.objects for all using (bucket_id = 'logos')  with check (bucket_id = 'logos');
create policy "covers_anon_write" on storage.objects for all using (bucket_id = 'covers') with check (bucket_id = 'covers');
